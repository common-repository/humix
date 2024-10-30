<?php
namespace HumixNamespace;

//Request utils are meant to handle pieces of data that can be shared between any
//Type of request being sent to ezoic. Eg. Data that can be accessed via standard
//php functions and calls.
class RequestUtils
{

	const MIDDLETON_API_VERSION = '1.0.0';
	const MIDDLETON_API_ENDPOINT = 'https://g.ezoic.net/';
	const WP_API_VERSION = '2.9.9';

	const PUBLISHER_BACKEND_ENDPOINT = 'https://api.humix.com/api/wp-plugin/v1/';

	/**
	 * Fetches the domain and TLD from the current request URL
	 *
	 * @return string
	 */
	public static function get_domain()
	{
		$domain = "";
		if (function_exists('site_url')) {
			$domain = parse_url(site_url(), PHP_URL_HOST);
		}
		return $domain;
	}

	public static function get_middleton_request($path)
	{
		global $wp;
		$home_url = home_url($wp->request);
		if (substr($home_url, -1) != '/' && function_exists('should_current_path_end_in_slash') && should_current_path_end_in_slash()) {
			$home_url = $home_url . '/';
		}

		$full_url = \site_url() . '/' . $path;

		$timeout = 5;
		$sslverify = true;
		$isLocal = false;
		if (strstr($full_url, "http://localhost") || strstr($full_url, ":48080")) {
			$timeout = 30;
			$sslverify = false;
			$isLocal = true;
		}

		$request_headers = array(
			'X-Humix-Wordpress-Request' => true,
			'X-Forwarded-For' => self::get_client_ip(),
			'Referer' => $full_url,
			'User-Agent' => !empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '',
		);

		$method = $_SERVER['REQUEST_METHOD'] ? $_SERVER['REQUEST_METHOD'] : 'GET';

		$request_params = array(
			'content_url' => $full_url,
			'http_method' => $method,
			'ezoic_api_version' => self::MIDDLETON_API_VERSION,
		);


		$url = self::MIDDLETON_API_ENDPOINT . $path;

		if (!empty($_GET)) {
			$request_params = array_merge($request_params, $_GET);
			// also append the query string to the URL
			$queryString = $_SERVER['QUERY_STRING'];
    		$url .= '?' . $queryString;
		}

		$request = array(
			'timeout' => $timeout,
			'body' => $request_params,
			'headers' => $request_headers,
			'cookies' => self::build_cookies_for_request(),
			'sslverify' => $sslverify,
		);

		if (strtoupper($method) == 'POST') {
			// for post requests, we go ahead and forward the request and payload to humix.com
			// this is not ideal but the existing middleton API does not support POST requests at this time
			if(substr($path, 0, 6) === 'humix/') {
				$humixPath = substr($path, 6);
				$humixBaseUrl = "https://humix.com/";
				if($isLocal) {
					$humixBaseUrl = "http://host.docker.internal:8888/";
				}
				$url = $humixBaseUrl.$humixPath;
			}
			$request['body'] = $_POST;
			return wp_remote_post($url, $request);
		}

		return wp_remote_get($url, $request);
	}

	public static function get_client_ip()
	{
		$ip = "";

		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			//to check ip is pass from proxy
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} elseif (isset($_SERVER['REMOTE_ADDR'])) {
			$ip = $_SERVER['REMOTE_ADDR'];
		}

		return $ip;
	}
	public static function build_cookies_for_request()
	{
		// Build proper cookies for WP remote post
		$cookies = [];

		foreach ($_COOKIE as $name => $value) {
			if (is_array($value)) {
				foreach ($value as $arr_name => $arr_value) {
					if (is_array($arr_value)) {
						$arr_value = json_encode($arr_value);
					}
					$cookies[] = ['name' => $name . '[' . $arr_name . ']', 'value' => $arr_value];
				}
			} else {
				$cookies[] = ['name' => $name, 'value' => $value];
			}
		}

		return array_map(function ($cookie) {
			return new \WP_Http_Cookie($cookie);
		}, $cookies);
	}

	public static function publisher_backend_request($token, $route, $method = "GET", $payload = null)
	{
		if ($token === "") {
			throw new \InvalidArgumentException("Token is empty");
		}
		if ($route === "") {
			throw new \InvalidArgumentException("Route is empty");
		}
		$method = strtoupper($method);
		if ($method !== "GET" && $method !== "POST") {
			throw new \InvalidArgumentException("Invalid method");
		}

		$requestOptions = array(
			'headers' => array(
				'Content-Type' => 'application/json; charset=utf8',
				'Authorization' => 'Bearer ' . $token,
			),
			'timeout' => 5,
			'sslverify' => true,
		);
		if ($payload) {
			$requestOptions['body'] = json_encode($payload);
			$requestOptions['data_format'] = 'body';
		}
		$baseApiEndpoint = self::PUBLISHER_BACKEND_ENDPOINT;
		$siteUrl = \site_url();

		if (strstr($siteUrl, "http://localhost") || strstr($siteUrl, ":48080")) {
			$requestOptions['timeout'] = 30;
			$requestOptions['sslverify'] = false;
			$baseApiEndpoint = 'https://host.docker.internal:8091/api/wp-plugin/v1/';
		}

		$endpoint = $baseApiEndpoint . $route . "?domain=" . self::get_domain();
		if ($method === "POST") {
			return wp_remote_post($endpoint, $requestOptions);
		}
		return wp_remote_get($endpoint, $requestOptions);
	}

}
