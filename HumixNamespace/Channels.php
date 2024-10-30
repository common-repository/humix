<?php
namespace HumixNamespace;

/**
 * Helper class to handle authentication against the publisher backend
 */
class Channels
{

    const MY_CHANNELS_CACHE_KEY = "humix_plugin:my_channels";
    const MY_CHANNELS_CACHE_TTL = 12 * 3600; // 12 hours
    const HOSTING_LIVE_CHECK_ENDPOINT = "_humix_integration_check";
    const HOSTING_LIVE_CHECK_RESPONSE = "humix-integration-ok";
    const MIDDLETON_REWRITE_RULE_REGEX = '^(humix|beardeddragon|ezoimgfmt|_humix_integration_check)/?(.*)?$';

    public function update_assigned_channel($token, $new_channel_id)
    {
        if ($token === "") {
            throw new \InvalidArgumentException("Token is empty");
        }
        $new_channel_id = (int) $new_channel_id;
        if ($new_channel_id <= 0) {
            throw new \InvalidArgumentException("Invalid channel ID supplied");
        }
        $payload = array(
            'humixChannelId' => (int) $new_channel_id,
        );
        $response = \HumixNamespace\RequestUtils::publisher_backend_request($token, 'assign-channel-to-domain', 'POST', $payload);
        if (is_wp_error($response)) {
            throw new \Exception("Error communicating with publisher backend: " . $response->get_error_message());
        }
        self::setup_middleton_paths();
    }

    public function remove_assigned_channel($token)
    {
        if ($token === "") {
            throw new \InvalidArgumentException("Token is empty");
        }
        $response = \HumixNamespace\RequestUtils::publisher_backend_request($token, 'remove-channel-from-domain', 'POST');
        if (is_wp_error($response)) {
            throw new \Exception("Error communicating with publisher backend: " . $response->get_error_message());
        }
        self::remove_middleton_paths();
    }

    public function get_assigned_channel_from_publisher_backend($token)
    {
        if ($token === "") {
            throw new \InvalidArgumentException("Token is empty");
        }
        $response = \HumixNamespace\RequestUtils::publisher_backend_request($token, 'assigned-channel', 'GET');
        if (is_wp_error($response)) {
            throw new \Exception("Error communicating with publisher backend: " . $response->get_error_message());
        }
        $body = wp_remote_retrieve_body($response);
        if (!$body) {
            throw new \Exception("Error empty response from publisher backend");
        }
        $data = json_decode($body, true);
        if (!array_key_exists('data', $data) || !is_array($data['data'])) {
            throw new \Exception("Error unexpected response from publisher backend");
        }
        $assigned_channel_response = $data["data"];
        return isset($assigned_channel_response["humixChannelId"]) ? (int) $assigned_channel_response["humixChannelId"] : -1;
    }

    public function get_channels($token)
    {
        $cached_channels = get_transient(self::MY_CHANNELS_CACHE_KEY);
        if ($cached_channels) {
            return $cached_channels;
        }
        if ($token === "") {
            throw new \InvalidArgumentException("Token is empty");
        }
        $response = \HumixNamespace\RequestUtils::publisher_backend_request($token, 'my-channels');
        if (is_wp_error($response)) {
            throw new \Exception("Error communicating with publisher backend: " . $response->get_error_message());
        }
        $body = wp_remote_retrieve_body($response);
        if (!$body) {
            throw new \Exception("Error empty response from publisher backend");
        }
        $data = json_decode($body, true);
        if (!array_key_exists('data', $data) || !is_array($data['data'])) {
            throw new \Exception("Error unexpected response from publisher backend");
        }
        $channels = $data["data"];
        set_transient(self::MY_CHANNELS_CACHE_KEY, $channels, self::MY_CHANNELS_CACHE_TTL);
        return $channels;
    }

    public static function setup_middleton_paths()
    {
        // setup rewrite rules for middleton requests
        add_rewrite_rule(self::MIDDLETON_REWRITE_RULE_REGEX, 'index.php?humix_middleton_path=$matches[1]/$matches[2]', 'top');

        // check if the rule already exists, if not, flush the rewrite rules to add it
        $rules = get_option('rewrite_rules');
        if (!isset($rules[self::MIDDLETON_REWRITE_RULE_REGEX])) {
            flush_rewrite_rules();
        }

        // add the middletone path query var and sets up the appropriate redirect handling to load middleton responses
        add_filter('query_vars', array(self::class, 'humix_plugin_middleton_path_query_var'));
        add_filter('user_trailingslashit', array(self::class, 'remove_trailing_slash_middleton_paths'), 10, 2);
        add_action('template_redirect', array(self::class, 'humix_plugin_render_middleton_path'));
    }

    // TODO: the stuff below probably better belongs in a more middleton-centric class

    public static function humix_plugin_middleton_path_query_var($vars)
    {
        $vars[] = 'humix_middleton_path';
        return $vars;
    }

    public static function remove_trailing_slash_middleton_paths($url, $type)
    {
        if (\get_query_var('humix_middleton_path') !== "") {
            return \untrailingslashit($url);
        }
        return $url;
    }

    public static function humix_plugin_render_middleton_path()
    {
        global $wp_query;
        if (!isset($wp_query->query_vars['humix_middleton_path'])) {
            // not a middleton request (e.g. /humix/video/1234)
            return;
        }

        $path = $wp_query->query_vars['humix_middleton_path'];

        if ($path === self::HOSTING_LIVE_CHECK_ENDPOINT || $path === self::HOSTING_LIVE_CHECK_ENDPOINT . '/') {
            // This is a live check request from humix.com
            echo self::HOSTING_LIVE_CHECK_RESPONSE;
            exit;
        }

        $response = \HumixNamespace\RequestUtils::get_middleton_request($path);
        if (is_wp_error($response)) {
            \error_log("Humix Plugin Error: Failed to load Humix Channel from middleton: " . $response->get_error_message());
            return;
        }

        // TODO: probably should just assign all headers from the response
        $headers = wp_remote_retrieve_headers($response);
        $content_type = isset($headers['content-type']) ? $headers['content-type'] : '';
        if (strpos($content_type, 'application/json') !== false) {
            header('Content-Type: application/json; charset=utf-8');
        }
        if (strpos($content_type, 'application/javascript') !== false) {
            header('Content-Type: application/javascript');
        }

        $output = wp_remote_retrieve_body($response);
        echo $output;
        exit;
    }

    public static function remove_middleton_paths()
    {
        // remove rewrite rules if they exist
        $rules = get_option('rewrite_rules');
        if (isset($rules[self::MIDDLETON_REWRITE_RULE_REGEX])) {
            // remove the middleton rewrite rules
            flush_rewrite_rules();
        }
        remove_action('template_redirect', array(self::class, 'humix_plugin_render_middleton_path'), 10);
        remove_filter('query_vars', array(self::class, 'humix_plugin_middleton_path_query_var'), 10);
    }

}