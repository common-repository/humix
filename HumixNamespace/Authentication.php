<?php

namespace HumixNamespace;

require 'RequestUtils.php';

/**
 * Helper class to handle authentication against the publisher backend
 */
class Authentication
{

	const TOKEN_CACHE_KEY = "humix_plugin:token";
	const IS_HUMIX_DIRECT = "humix_plugin:is_humix_direct_domain";
	const IS_HUMIX_DIRECT_CACHE_TTL = 24 * 3600; // 24 hours, and really could be longer, its not something that will change often

	/**
	 * Registers the necessary callback endpoint for authentication
	 */
	public static function register()
	{
		// Adds callback route for publisher backend to verify the original request to generate a token was valid
		add_action('rest_api_init', function () {
			register_rest_route(
				RestApi::REST_API_BASE,
				'/auth/verify',
				array(
					'methods' => \WP_REST_SERVER::READABLE,
					'callback' => array(self::class, 'verify_handler'),
					'permission_callback' => '__return_true',
					'show_in_index' => false
				)
			);
		});
	}

	public static function verify_handler(\WP_REST_Request $request)
	{
		$token = $request->get_header('X-AUTH-TOKEN');
		if (!isset($token)) {
			return new \WP_REST_Response("invalid token", 400);
		}

		// Extract expiration
		$splitToken = explode(':', $token);
		$expires = (int) $splitToken[1];

		// Ensure the token has not timed out
		if (time() > $expires) {
			return new \WP_REST_Response("invalid token", 400);
		}

		// Ensure token is valid
		$calculatedToken = self::generate_token($expires);
		if ($calculatedToken != $token) {
			return new \WP_REST_Response("invalid token", 400);
		}

		// Signal that the token is valid
		return new \WP_REST_Response("token validated", 200);
	}

	/**
	 * Fetches a token for use in calls to the backend
	 */
	public static function get_token_from_publisher_backend()
	{
		$cached_token = get_transient(self::TOKEN_CACHE_KEY);
		if ($cached_token) {
			return $cached_token;
		}

		// First, we'll create our own token to send to publisher backend for initial verification
		// then, publisher backend will make a request back to this domain with the supplied token
		// so this domain can verify the request was valid. Then, publisher backend will provision
		// a more longer-lived token that we can use for subsequent API requests.
		$expires = time() + 30;
		$token = self::generate_token($expires);
		$siteUrl = \site_url();
		$callback = \get_rest_url(null, 'humix/v1/auth/verify');

		$baseApiEndpoint = RequestUtils::PUBLISHER_BACKEND_ENDPOINT;
		$requestOptions = array(
			'headers' => array('Content-Type' => 'application/json; charset=utf8'),
			'body' => json_encode(
				array(
					'siteUrl' => $siteUrl,
					'token' => $token,
					'callback' => $callback,
				)
			),
			'timeout' => 5,
			'sslverify' => true,
		);


		if (strstr($siteUrl, "http://localhost") || strstr($siteUrl, ":48080")) {
			$requestOptions['sslverify'] = false;
			$requestOptions['timeout'] = 30;
			$baseApiEndpoint = 'https://host.docker.internal:8091/api/wp-plugin/v1/';
		}

		$getTokenEndpoint = $baseApiEndpoint . 'get-token';

		// Fetch auth key
		$response = wp_remote_post($getTokenEndpoint, $requestOptions);

		if (is_wp_error($response)) {
			\error_log("Humix Plugin Error: Get token request failed: " . $response->get_error_message());
			return "";
		}

		$responseBody = wp_remote_retrieve_body($response);
		$parsed = json_decode($responseBody);
		if (!$parsed || !isset($parsed->data)) {
			error_log("Humix Plugin Error: Unexpected response from get-token request");
			return "";
		}
		$token = $parsed->data;
		if (!strstr($token, ':')) {
			error_log("Humix Plugin Error: Unexpected response from get-token request");
			return "";
		}
		$expTime = (int) explode(":", $token)[1];
		if (!$expTime) {
			error_log("Humix Plugin Error: Unexpected response from get-token request");
			return "";
		}
		if ($expTime < time()) {
			error_log("Humix Plugin Error: Token expired");
			return "";
		}
		$cacheTLL = $expTime - time() - 30; // subtract 30 seconds just as a rough buffer

		// cache it for token lifespan - 30 seconds
		set_transient(self::TOKEN_CACHE_KEY, $token, $cacheTLL);
		return $token;
	}

	/**
	 * Generates a token hash for use in a callback from the backend for verification
	 */
	private static function generate_token($expires)
	{
		$domain = RequestUtils::get_domain();
		// note: AUTH_KEY comes from WP: https://www.wpbeginner.com/glossary/security-keys/
		$token = hash_hmac('sha256', $domain . ':' . $expires, AUTH_KEY) . ':' . $expires;

		return $token;
	}

	public function is_humix_direct_domain($token)
	{
		// we have to cache result as string since an empty cache returns false, so we can't differentiate between false and not cached
		$cached_result_as_str = get_transient(self::IS_HUMIX_DIRECT);
		if ($cached_result_as_str) {
			return $cached_result_as_str === "true";
		}

		if ($token === "") {
			throw new \InvalidArgumentException("Token is empty");
		}

		$response = RequestUtils::publisher_backend_request($token, 'is-humix-direct-domain');

		if (is_wp_error($response)) {
			throw new \Exception($response->get_error_message());
		}
		$body = wp_remote_retrieve_body($response);
		if (!$body) {
			throw new \Exception("Error empty response from publisher backend");
		}
		$data = json_decode($body, true);
		if (is_null($data) || !array_key_exists('data', $data) || !is_array($data['data'])) {
			throw new \Exception("Error unexpected response from publisher backend");
		}
		$result = $data['data']["isHumixDirectDomain"] === true;

		// need to convert result to string for cache since caching a bool would be indistinguishable from not cached
		$result_as_str = $result ? "true" : "false";
		set_transient(self::IS_HUMIX_DIRECT, $result_as_str, self::IS_HUMIX_DIRECT_CACHE_TTL);
		return $result;
	}
}
