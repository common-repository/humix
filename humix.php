<?php


require "HumixNamespace/Authentication.php";
require "HumixNamespace/Channels.php";
require "HumixNamespace/Settings.php";
require "HumixNamespace/RestApi.php";

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.humix.com/
 * @since             1.5.0
 * @package           Humix
 *
 * @wordpress-plugin
 * Plugin Name:       Humix
 * Plugin URI:        https://wordpress.org/plugins/humix
 * Description:       Humix allows you to easily embed videos to your site from the Humix Network.
 * Version:           1.5.0
 * Author:            Humix
 * Author URI:        https://www.humix.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       humix
 * Domain Path:       /languages
 */

if (!defined('ABSPATH'))
	exit; // Exit if accessed directly     

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('HUMIX_VERSION', '1.5.0');

global $EZHX_REGEX;
$EZHX_REGEX = '/^https?:\/\/(www\.)?(humix\.com\/[\w-]{11,}|humix\.com\/(@?[\w-]+\/)?video\/(playlist\/)?[\w-]{11,}|[\w.-]+\/humix\/video\/(playlist\/)?[\w-]{11,})([\?|\&]?[\w]+=[\w-]*)*$/';

global $EZHX_GENERATE_EMBED_CODE_BASE;
$EZHX_GENERATE_EMBED_CODE_BASE = 'https://www.humix.com/generate-embed-code?j=';

const EZHX_WORDPRESS_EMBED_CODE_SOURCE = 'w';

function ezhx_init_humix_plugin()
{
	// initialize the regex for Humix oembed
	global $EZHX_REGEX;
	wp_embed_register_handler(
		'humix',
		$EZHX_REGEX,
		'EZHX_humix_embed_content'
	);

	// register callback route for API authentication
	\HumixNamespace\Authentication::register();

	// register API endpoitns
	\HumixNamespace\RestApi::register();

	// handle rewrite rules for middleton requests appropriately
	$assigned_humix_channel_id = \HumixNamespace\Settings::get_assigned_channel_id();
	if ($assigned_humix_channel_id > 0) {
		\HumixNamespace\Channels::setup_middleton_paths();
	} else {
		\HumixNamespace\Channels::remove_middleton_paths();
	}

	// handle redirect for ads.txt appropriately
	$adx_txt_manager_id = \HumixNamespace\Settings::get_adstxt_manager_id();
	if ($adx_txt_manager_id > 0) {
		\HumixNamespace\Settings::set_adstxt_redirect();
	}

	// handle insert videos on all pages if enabled
	$insert_on_all_pages = \HumixNamespace\Settings::get_insert_on_all_pages();
	if ($insert_on_all_pages) {
		add_action('wp_head', [\HumixNamespace\Settings::class, 'add_auto_insert_script_to_head']);
	}

	// show plugin settings page if conditions are met
	add_action('admin_menu', array('\HumixNamespace\Settings', 'init_settings_page'));

	$plugin_basename = \plugin_basename(__FILE__);
	\add_filter("plugin_action_links_$plugin_basename", array('\HumixNamespace\Settings', 'add_plugin_settings_link'));
}
add_action('init', 'ezhx_init_humix_plugin');

function EZHX_get_oembed_response_with_attributes($url, $attr)
{

	$req_url = sprintf("https://humix.com/humix/oembed?url=%s&float=%s&autoplay=%s&loop=%s", $url, $attr['float'], $attr['autoplay'], $attr['loop']);

	$response = wp_remote_get(
		$req_url,
		array(
			'sslverify' => false,
			'headers' => array(
				'Referer' => get_site_url()
			)
		)
	);

	// leave early if there's an error
	if (is_wp_error($response)) {
		return '';
	}

	$body = wp_remote_retrieve_body($response);

	if ($body != '') {
		$data = json_decode($body, true);
		return $data['html'];
	}

	return '';
}

function EZHX_is_valid_video_url($url)
{
	$regex = '/^https:\/\/[\w.-]+\/humix\/video\/[\w-]+$/';
	return preg_match($regex, $url);
}

function EZHX_strip_query_params($url)
{
	$url_components = parse_url($url);

	if (isset($url_components['scheme']) && isset($url_components['host'])) {
		$new_url = $url_components['scheme'] . '://' . $url_components['host'];

		if (isset($url_components['path'])) {
			$new_url .= $url_components['path'];
		}

		return $new_url;
	}

	return $url;
}


function EZHX_humix_embed_content($matches, $attr, $url, $rawattr)
{

	$new_url = EZHX_strip_query_params($url);

	$settings = array(
		'float' => '1',
		'autoplay' => '1',
		'loop' => '0',
	);

	$response = EZHX_get_oembed_response_with_attributes($new_url, $settings);

	if ($response != '') {
		return $response;
	}

	return '';
}

require_once (__DIR__ . '/humix-block/humix-block.php');

function EZHX_generate_json($options = [])
{
	// Default values
	$defaults = [
		'autoplay' => false,
		'floatOption' => true,
		'videoId' => "",
		'autoMatch' => false,
		'matchCategory' => "",
		'startTime' => 0,
		'width' => 640,
		'height' => 360,
		'preview' => false,
		'autoMatchOption' => 0,
		'categories' => "",
		'embedCodeSource' => EZHX_WORDPRESS_EMBED_CODE_SOURCE,
	];

	// Merge default values with provided options
	$options = array_merge($defaults, $options);

	// Set required options first
	$settings = [
		'auto_play' => $options['autoplay'],
		'float' => $options['floatOption'],
		'width' => $options['width'],
		'height' => $options['height'],
		'embed_code_source' => $options['embedCodeSource'],
	];

	// Either videoId exists or automatch exists
	if (!empty($options['videoId'])) {
		$settings['videoId'] = $options['videoId'];
	}

	if ($options['autoMatch']) {
		$settings['auto_match'] = $options['autoMatch'];
		$settings['auto_match_option'] = $options['autoMatchOption'];
	}

	if (!empty($options['categories'])) {
		$category_ids = EZHX_get_category_ids_from_input($options['categories']);
		if (count($category_ids) > 0) {
			$settings['match_category_ids'] = $category_ids;
		}
	}

	if ($options['startTime'] > 0) {
		$settings['time_start'] = $options['startTime'];
	}

	if ($options['preview']) {
		$settings['preview'] = $options['preview'];
	}

	return json_encode($settings);
}

/**
 * Converts shortcode category structure into array of integers. Filters out any non-integer values.
 * @param $input string shortcode category structure (e.g. "1, 2, 3")
 * @return array of integers (e.g. [1, 2, 3])
 */
function EZHX_get_category_ids_from_input($input)
{
	$input_cats = explode(',', $input);
	$category_ids = [];
	foreach ($input_cats as $input_cat) {
		$trimmed = trim($input_cat);
		if (is_numeric($trimmed) && strpos($trimmed, '.') === false) {
			$category_ids[] = (int) $trimmed;
		}
	}
	return $category_ids;
}

function EZHX_get_generated_embed_response($attr)
{
	if ($attr['float'] == '0') {
		$settings['floatOption'] = false;
	}

	if ($attr['autoplay'] == '0') {
		$settings['autoplay'] = false;
	}

	if ($attr['auto'] == '1') {
		$settings['autoMatch'] = true;
		if ($attr['categories'] !== "") {
			$settings['categories'] = $attr['categories'];
		}

		if ($attr['amo'] !== "" && $attr['amo'] !== "-1") {
			$settings['autoMatchOption'] = intval($attr['amo']);
		} else {
			// If categories are supplied, use auto match option 1 (network + owned by categories)
			// otherwise, use option 0 (network + owned by page topic)
			$settings['autoMatchOption'] = $attr['categories'] !== "" ? 1 : 0;
		}
	}

	if ($attr['url'] !== "") {
		$new_url = EZHX_strip_query_params($attr['url']);
		$parts = explode("/", $new_url);
		$videoId = end($parts);

		$settings['videoId'] = $videoId;
	}

	global $EZHX_GENERATE_EMBED_CODE_BASE;

	$req_url = $EZHX_GENERATE_EMBED_CODE_BASE . urlencode(EZHX_generate_json($settings));

	$response = wp_remote_get(
		$req_url,
		array(
			'sslverify' => false,
		)
	);

	$body = wp_remote_retrieve_body($response);

	if ($body != '') {
		return $body;
	}

	return '';

}

function EZHX_humix_link_attr($atts)
{
	$default = array(
		'url' => '',
		'float' => '1',
		'autoplay' => '1',
		'loop' => '1',
		'auto' => '0',
		'amo' => '-1',
		'categories' => ''
	);
	$a = shortcode_atts($default, $atts);

	if ($a['auto'] == '1') {
		return EZHX_get_generated_embed_response($a);
	}

	if (!EZHX_is_valid_video_url($a['url'])) {
		return '';
	}

	if (strpos($a['url'], "/playlist") !== false) {
		return EZHX_get_generated_embed_response($a);
	}

	$new_url = EZHX_strip_query_params($a['url']);

	return EZHX_get_oembed_response_with_attributes($new_url, $a);
}
add_shortcode('humix', 'EZHX_humix_link_attr');

function humix_plugin_activate()
{
	// if admin is re-activating plugin, they may have some old settings that we can re-insert into publisher backend
	// the idea being, maybe they had a channel setup before, then disabled the plugin temporarily, and now re-enabling it
	// the expectation is that the previously assigned channel is live again. This can always be changed later if need be.
	$assigned_humix_channel = \HumixNamespace\Settings::get_assigned_channel_id();
	if ($assigned_humix_channel > 0) {
		$auth = new \HumixNamespace\Authentication();
		$token = $auth->get_token_from_publisher_backend();
		$channel_svc = new \HumixNamespace\Channels();
		try {
			$channel_svc->update_assigned_channel($token, $assigned_humix_channel);
		} catch (\Exception $e) {
			\error_log('Humix Plugin Error: Failed to assign channel on activation: ' . $e->getMessage());
		}
	}
}
register_activation_hook(__FILE__, 'humix_plugin_activate');

// TODO: We probably should consider cleaning up any humix blocks the admin has created when deactivating, or at
// least when uninstalling
function humix_plugin_deactivate()
{
	$assigned_humix_channel = \HumixNamespace\Settings::get_assigned_channel_id();
	if ($assigned_humix_channel > 0) {
		$auth = new \HumixNamespace\Authentication();
		$token = $auth->get_token_from_publisher_backend();
		$channel_svc = new \HumixNamespace\Channels();
		try {
			$channel_svc->remove_assigned_channel($token);
		} catch (\Exception $e) {
			\error_log('Humix Plugin Error: Failed to remove channel assignment on deactivation: ' . $e->getMessage());
			// still need to purge middleton paths even if we failed to delete record from publisher backend
			\HumixNamespace\Channels::setup_middleton_paths();
		}
	}
}
register_deactivation_hook(__FILE__, 'humix_plugin_deactivate');

// Full uninstallation of plugin
function humix_plugin_uninstall()
{
	// first, do deactivate logic
	humix_plugin_deactivate();

	\HumixNamespace\Settings::delete_settings();
}
register_uninstall_hook(__FILE__, 'humix_plugin_uninstall');