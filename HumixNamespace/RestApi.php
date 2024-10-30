<?php
namespace HumixNamespace;

class RestApi
{

    const REST_API_BASE = 'humix/v1';

    /**
     * Registers the necessary callback endpoint for authentication
     */
    public static function register()
    {
        // Adds callback route for publisher backend to verify the original request to generate a token was valid
        add_action('rest_api_init', function () {
            register_rest_route(
                self::REST_API_BASE,
                '/plugin-meta',
                array(
                    'methods' => \WP_REST_SERVER::READABLE,
                    'callback' => array(self::class, 'plugin_meta_handler'),
                    'permission_callback' => '__return_true',
                    'show_in_index' => false
                )
            );
            register_rest_route(
                self::REST_API_BASE,
                '/channel-meta',
                array(
                    'methods' => \WP_REST_SERVER::READABLE,
                    'callback' => array(self::class, 'channel_meta_handler'),
                    'permission_callback' => '__return_true',
                    'show_in_index' => false
                )
            );
            register_rest_route(
                self::REST_API_BASE,
                '/resync-channel-settings',
                array(
                    'methods' => \WP_REST_SERVER::CREATABLE,
                    'callback' => array(self::class, 'resync_channel_settings_handler'),
                    'permission_callback' => '__return_true',
                    'show_in_index' => false
                )
            );
        });
    }

    public static function plugin_meta_handler(\WP_REST_Request $request)
    {
        return new \WP_REST_Response([
            'message' => 'ok',
            'version' => HUMIX_VERSION,
        ], 200);
    }

    public static function channel_meta_handler(\WP_REST_Request $request)
    {
        $channel_id = Settings::get_assigned_channel_id();
        $has_hosted_channel = $channel_id > 0;
        return new \WP_REST_Response([
            'message' => 'ok',
            'has_hosted_channel' => $has_hosted_channel,
            'channel_id' => $channel_id,
        ], 200);
    }

    public static function resync_channel_settings_handler(\WP_REST_Request $request)
    {
        $currentlyAssignedChannelId = Settings::get_assigned_channel_id();
        $auth = new Authentication();
        $token = $auth->get_token_from_publisher_backend();
        $channelService = new Channels();
        $backendAssignedChannelId = -1;
        try {
            $backendAssignedChannelId = $channelService->get_assigned_channel_from_publisher_backend($token);
        } catch (\Exception $e) {
            \error_log("Humix Plugin Error: Failed to resync channel settings: " . $e->getMessage());
            return new \WP_REST_Response([
                'message' => 'error',
                'error' => $e->getMessage(),
            ], 500);
        }
        if ((int) $currentlyAssignedChannelId !== (int) $backendAssignedChannelId) {
            (new Settings())->update_assigned_channel_id($backendAssignedChannelId);
        }
        return new \WP_REST_Response(['message' => 'ok'], 200);
    }
}