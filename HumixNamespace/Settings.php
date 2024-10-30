<?php

namespace HumixNamespace;

class Settings
{

	const PAGE_TITLE = 'Humix Settings';
	const MENU_TITLE = 'Humix';
	const CAPABILITY = 'manage_options';
	const MENU_SLUG = 'humix_settings';

	const PREFIX = 'humix_plugin_';
	const GROUP_SUFFIX = '_group';
	const SECTION_SUFFIX = '_section';
	const PAGE_SUFFIX = '_page';

	const CHANNEL_SETTINGS = self::PREFIX . 'channel_settings';
	const CHANNEL_SETTINGS_GROUP = self::CHANNEL_SETTINGS . self::GROUP_SUFFIX;
	const CHANNEL_SETTINGS_SECTION = self::CHANNEL_SETTINGS . self::SECTION_SUFFIX;
	const CHANNEL_SETTINGS_PAGE = self::CHANNEL_SETTINGS . self::PAGE_SUFFIX;
	const ASSIGNED_CHANNEL_ID_OPTION = self::PREFIX . 'assigned_channel_id';

	const ADSTXT_MANAGER_SETTINGS = self::PREFIX . 'adstxt_manager';
	const ADSTXT_MANAGER_SETTINGS_GROUP = self::ADSTXT_MANAGER_SETTINGS . self::GROUP_SUFFIX;
	const ADSTXT_MANAGER_SETTINGS_SECTION = self::ADSTXT_MANAGER_SETTINGS . self::SECTION_SUFFIX;
	const ADSTXT_MANAGE_SETTINGS_PAGE = self::ADSTXT_MANAGER_SETTINGS . self::PAGE_SUFFIX;
	const ADSTXT_MANAGER_ID_OPTION = self::PREFIX . 'adxtxt_manager_id';

	const INSERT_ON_ALL_PAGES_OPTION = self::PREFIX . 'insert_on_all_pages';
	const VIDEO_INSERT_SETTINGS = self::PREFIX . 'video_insert_settings';
	const VIDEO_INSERT_SETTINGS_GROUP = self::VIDEO_INSERT_SETTINGS . self::GROUP_SUFFIX;
	const VIDEO_INSERT_SETTINGS_SECTION = self::VIDEO_INSERT_SETTINGS . self::SECTION_SUFFIX;
	const VIDEO_INSERT_SETTINGS_PAGE = self::VIDEO_INSERT_SETTINGS . self::PAGE_SUFFIX;

	public static function get_assigned_channel_id()
	{
		return (int) \get_option(self::ASSIGNED_CHANNEL_ID_OPTION, -1);
	}

	public static function update_assigned_channel_id($val)
	{
		$val = (int) $val;
		if ($val === 0 || $val < -1) {
			throw new \InvalidArgumentException("Invalid channel ID supplied");
		}
		\update_option(self::ASSIGNED_CHANNEL_ID_OPTION, $val);
		if ($val > 0) {
			(new \HumixNamespace\Channels())->setup_middleton_paths();
		} else {
			(new \HumixNamespace\Channels())->remove_middleton_paths();
		}
	}

	public static function get_adstxt_manager_id()
	{
		return (int) \get_option(self::ADSTXT_MANAGER_ID_OPTION, -1);
	}

	public static function get_insert_on_all_pages()
	{
		return (bool) \get_option(self::INSERT_ON_ALL_PAGES_OPTION, false);
	}

	public static function set_adstxt_redirect()
	{
		if (self::get_adstxt_manager_id() <= 0) {
			return;
		}
		\add_action('template_redirect', [self::class, 'adstxt_redirect']);
	}

	public static function adstxt_redirect()
	{
		global $wp;
		$isAdsTxtRequest = isset($wp->request) && $wp->request === 'ads.txt';
		if (!$isAdsTxtRequest) {
			return;
		}
		$adstxt_manager_id = self::get_adstxt_manager_id();
		if ($adstxt_manager_id <= 0) {
			return;
		}
		$domain = \wp_parse_url(\get_site_url(), PHP_URL_HOST);
		$domain = preg_replace('/^www\./', '', $domain);
		\wp_redirect('https://srv.adstxtmanager.com/' . $adstxt_manager_id . '/' . $domain, 301);
		exit();
	}

	public static function add_auto_insert_script_to_head()
	{
		if (!self::get_insert_on_all_pages()) {
			return;
		}
		?>
		<script>(window.humixPlayers = window.humixPlayers || []).push({ target: 'autoinsert', isGenerated: true });</script>
		<script async data-cfasync="false" src='https://www.humix.com/video.js'></script>
		<?php
	}

	public static function delete_settings()
	{
		$pluginSettings = array(
			self::ASSIGNED_CHANNEL_ID_OPTION,
			self::ADSTXT_MANAGER_ID_OPTION,
			self::INSERT_ON_ALL_PAGES_OPTION
		);

		foreach ($pluginSettings as $setting) {
			// use "not_found" default so that if option exists and its value is falsey, it is still deleted
			if (\get_option($setting, 'not_found') !== 'not_found') {
				\delete_option($setting);
			}
		}
	}

	public static function show_settings_page()
	{
		// For now, we only need to show the settings page if the domain is a Humix Direct domain.
		$auth = new \HumixNamespace\Authentication();
		$token = $auth->get_token_from_publisher_backend();
		$is_humix_direct_domain = false;
		try {
			// note: this will now return true if the domain is SA integrated or whitelisted as a test/demo domain
			$is_humix_direct_domain = $auth->is_humix_direct_domain($token);
		} catch (\InvalidArgumentException $ae) {
			\error_log("Humix Plugin Error: Invalid Token supplied from Authentication Service");
			return false;
		} catch (\Exception $e) {
			\error_log("Humix Plugin Error: " . $e->getMessage());
			return false;
		}

		return $is_humix_direct_domain;
	}

	public static function init_settings_page()
	{
		if (!self::show_settings_page()) {
			// for non Humix Direct domains we do not show the settings page since they are all domain-specific
			return;
		}
		\add_options_page(self::PAGE_TITLE, self::MENU_TITLE, self::CAPABILITY, self::MENU_SLUG, array(self::class, 'humix_plugin_options_page'));
		\add_action('admin_init', array(self::class, 'humix_plugin_settings_init'));
	}

	public static function add_plugin_settings_link($links)
	{
		if (!self::show_settings_page()) {
			// for non Humix Direct domains we do not show the settings page since they are all domain-specific
			return $links;
		}
		$humix_direct_link = '<a href="https://app.humix.com/site/" target="_blank">Humix Dashboard</a>';
		array_unshift($links, $humix_direct_link);
		$settings_link = '<a href="options-general.php?page=' . self::MENU_SLUG . '">Settings</a>';
		array_unshift($links, $settings_link);
		return $links;
	}

	public static function humix_plugin_settings_init()
	{
		// video insert settings tab
		\register_setting(self::VIDEO_INSERT_SETTINGS_GROUP, self::INSERT_ON_ALL_PAGES_OPTION);
		\add_settings_section(self::VIDEO_INSERT_SETTINGS_SECTION, null, null, self::VIDEO_INSERT_SETTINGS_PAGE);
		\add_settings_field(self::INSERT_ON_ALL_PAGES_OPTION, '', array(self::class, 'render_insert_on_all_pages_option'), self::VIDEO_INSERT_SETTINGS_PAGE, self::VIDEO_INSERT_SETTINGS_SECTION);

		// channel settings tab
		\register_setting(self::CHANNEL_SETTINGS_GROUP, self::ASSIGNED_CHANNEL_ID_OPTION);
		\add_settings_section(self::CHANNEL_SETTINGS_SECTION, null, null, self::CHANNEL_SETTINGS_PAGE);
		\add_settings_field(self::ASSIGNED_CHANNEL_ID_OPTION, 'Channel', array(self::class, 'render_assigned_channel_id_option'), self::CHANNEL_SETTINGS_PAGE, self::CHANNEL_SETTINGS_SECTION);
		\add_action('pre_update_option_' . self::ASSIGNED_CHANNEL_ID_OPTION, array(self::class, 'on_assigned_channel_id_option_change'), 10, 3);

		// ads.txt manager settings tab
		\register_setting(self::ADSTXT_MANAGER_SETTINGS_GROUP, self::ADSTXT_MANAGER_ID_OPTION);
		\add_settings_section(self::ADSTXT_MANAGER_SETTINGS_SECTION, null, null, self::ADSTXT_MANAGE_SETTINGS_PAGE);
		\add_settings_field(self::ADSTXT_MANAGER_ID_OPTION, 'ID Number', array(self::class, 'render_adstxt_manager_id_option'), self::ADSTXT_MANAGE_SETTINGS_PAGE, self::ADSTXT_MANAGER_SETTINGS_SECTION);
		\add_action('pre_update_option_' . self::ADSTXT_MANAGER_ID_OPTION, array(self::class, 'on_adstxt_manager_id_option_change'), 10, 3);
	}

	public static function is_using_plain_permalinks()
	{
		global $wp_rewrite;
		return !$wp_rewrite->using_permalinks();
	}

	public static function show_permalinks_unsupported_notice()
	{
		?>
		<div id="setting-error-permalinks_unsupported" class="notice notice-error settings-error">
			<p><strong>Notice:</strong> "Plain" permalinks structure is not supported for Humix Channel and Ads.txt features,
				please update your permalinks structure to use these features</p>
		</div>
		<?php
	}

	const VIDEO_INSERT_SETTINGS_TAB = 'video_insert_settings';
	const CHANNEL_SETTINGS_TAB = 'channel_settings';
	const ADSTXT_SETTINGS_TAB = 'adstxt_settings';
	const DEFAULT_SELECTED_TAB = self::VIDEO_INSERT_SETTINGS_TAB;

	public static function humix_plugin_options_page()
	{
		if (self::is_using_plain_permalinks()) {
			// we do not support plain permalinks for the settings features
			self::show_permalinks_unsupported_notice();
		}
		?>
		<div class="wrap">
			<p>
				<img alt="Humix Logo" src="https://assets.humix.com/full_humix_logo.png" />
			</p>
			<?php
			$active_tab = self::DEFAULT_SELECTED_TAB;
			$tmp_active_tab = isset($_GET['tab']) ? $_GET['tab'] : '';
			if (in_array($tmp_active_tab, array(self::CHANNEL_SETTINGS_TAB, self::ADSTXT_SETTINGS_TAB))) {
				$active_tab = $tmp_active_tab;
			}
			?>
			<h2 class="nav-tab-wrapper">
				<a href="?page=<?php echo self::MENU_SLUG ?>&tab=<?php echo self::VIDEO_INSERT_SETTINGS_TAB ?>"
					class="nav-tab <?php echo $active_tab == self::VIDEO_INSERT_SETTINGS_TAB ? 'nav-tab-active' : ''; ?>">Video
					Insert Settings</a>
				<a href="?page=<?php echo self::MENU_SLUG ?>&tab=<?php echo self::CHANNEL_SETTINGS_TAB ?>"
					class="nav-tab <?php echo $active_tab == self::CHANNEL_SETTINGS_TAB ? 'nav-tab-active' : ''; ?>">Channel
					Settings</a>
				<a href="?page=<?php echo self::MENU_SLUG ?>&tab=<?php echo self::ADSTXT_SETTINGS_TAB ?>"
					class="nav-tab <?php echo $active_tab == self::ADSTXT_SETTINGS_TAB ? 'nav-tab-active' : ''; ?>">Ads.txt
					Manager</a>


				<a href="https://support.ezoic.com/kb/category/video-humix-studio" target="_blank" class="nav-tab"
					style="float: right;">
					Help Center
				</a>
				<a href="https://login.humix.com/" target="_blank" class="nav-tab" style="float: right;">
					Humix Dashboard
				</a>
			</h2>
			<?php
			switch ($active_tab) {
				case self::VIDEO_INSERT_SETTINGS_TAB:
					self::render_video_insert_settings_tab();
					break;
				case self::CHANNEL_SETTINGS_TAB:
					self::render_channel_settings_tab();
					break;
				case self::ADSTXT_SETTINGS_TAB:
					self::render_adstxt_manager_settings_tab();
					break;
				default:
					self::render_video_insert_settings_tab();
					break;
			}
			?>
		</div>
	<?php
	}

	public static function render_video_insert_settings_tab()
	{
		?>
		<div class="wrap">
			<h2>Video Insert Settings</h2>
			<p class="notice notice-info" style="padding: 15px;">
				Automatically insert videos on all pages in this site.
				<br />
				To configure the behavior and placement of the auto-inserted videos, visit the <a
					href="https://app.humix.com/site/settings/content-settings" target="_blank">Humix Dashboard</a>.
			</p>
			<form action="options.php" method="post">
				<?php
				\settings_fields(self::VIDEO_INSERT_SETTINGS_GROUP);
				\do_settings_sections(self::VIDEO_INSERT_SETTINGS_PAGE);
				\submit_button();
				?>
			</form>
		</div>
		<?php
	}

	public static function render_channel_settings_tab()
	{
		$channel_page = rtrim(\site_url(), "/") . "/humix";
		?>
		<div class="wrap">
			<h2>Channel Settings</h2>
			<p class="notice notice-info" style="padding: 15px;">
				Select a channel from your account below to display on this site at <a href="<?php echo $channel_page; ?>"
					target="_blank"><?php echo $channel_page; ?></a>
			</p>
			<form action="options.php" method="post">
				<?php
				\settings_fields(self::CHANNEL_SETTINGS_GROUP);
				\do_settings_sections(self::CHANNEL_SETTINGS_PAGE);
				\submit_button();
				?>
			</form>
		</div>
		<?php
	}

	public static function render_adstxt_manager_settings_tab()
	{
		?>
		<div class="wrap">
			<h2>Ads.txt Manager Settings</h2>
			<p class="notice notice-info" style="padding: 15px;">
				In order to use Adx.txt Manager, you must enter your Ads.txt Manager ID number below.
				<br>
				<br>
				If you are setting up via the Humix dashboard, you can put in <code>70772</code> as the ID. If you created an
				account with <a href="https://www.adstxtmanager.com/" target="_blank">adstxtmanager.com</a>, click <a
					href="https://www.adstxtmanager.com/" target="_blank">here</a> to login and access your ID.
			</p>
			<form action="options.php" method="post">
				<?php
				\settings_fields(self::ADSTXT_MANAGER_SETTINGS_GROUP);
				\do_settings_sections(self::ADSTXT_MANAGE_SETTINGS_PAGE);
				\submit_button();
				?>
			</form>
		</div>
		<?php
	}

	public static function render_insert_on_all_pages_option()
	{
		?>
		<span style="position: absolute; left: 0; margin: 0 15px;">
			<input id="insert-on-all-pages" type="checkbox" name="<?php echo self::INSERT_ON_ALL_PAGES_OPTION; ?>" <?php \checked(self::get_insert_on_all_pages(), true); ?>>
			<label for="insert-on-all-pages">Automatically insert video on all pages</label>
		</span>
		<br />
		<?php
	}

	public static function render_assigned_channel_id_option()
	{
		$auth = new \HumixNamespace\Authentication();
		$token = $auth->get_token_from_publisher_backend();
		$channels = [];
		$load_channels_err = false;
		try {
			$channels = (new \HumixNamespace\Channels())->get_channels($token);
		} catch (\Exception $e) {
			\error_log("Humix Plugin Error: Failed to load channels: " . $e->getMessage());
			$load_channels_err = true;
		}

		if ($load_channels_err || empty($channels)) {
			?>
			<div id="setting-error-api_error" class="notice notice-error settings-error">
				<p><strong>Failed to load your channels from your account. Please refresh the page and try again.</strong></p>
			</div>
			<?php
			return;
		}

		$selected_channel_id = self::get_assigned_channel_id();
		?>
		<select name="<?php echo self::ASSIGNED_CHANNEL_ID_OPTION; ?>">
			<option value="-1" <?php \selected($selected_channel_id, -1); ?>>
				<?php
				echo (int) $selected_channel_id === -1 ? "Select a channel" : "Remove channel from this site";
				?>
			</option>
			<?php foreach ($channels as $channel): ?>
				<option value="<?php echo \esc_attr($channel['humixChannelId']); ?>" <?php \selected($selected_channel_id, $channel['humixChannelId']); ?>>
					<?php echo \esc_html($channel['name']); ?>
				</option>
			<?php endforeach; ?>
		</select>
		<?php
	}

	public static function render_adstxt_manager_id_option()
	{
		$selected_option = self::get_adstxt_manager_id()
			?>
		<input name="<?php echo self::ADSTXT_MANAGER_ID_OPTION; ?>" class="regular-text code"
			placeholder="Enter your Ads.txt Manager ID..." <?php
			if ($selected_option > 0) {
				echo 'value="' . $selected_option . '"';
			}
			?>></input>
		<?php
	}

	public static function on_assigned_channel_id_option_change($new_channel_id, $old_channel_id, $option)
	{
		// Check if the new value is different from the old value
		if ($old_channel_id === $new_channel_id) {
			return $new_channel_id;
		}

		$auth = new \HumixNamespace\Authentication();
		$token = $auth->get_token_from_publisher_backend();
		$channelService = new \HumixNamespace\Channels();
		try {
			if ($new_channel_id > 0) {
				$channelService->update_assigned_channel($token, $new_channel_id);
			} else {
				$channelService->remove_assigned_channel($token);
			}
		} catch (\Exception $e) {
			\add_settings_error(
				$option,
				'api_error',
				'Failed to update your channel settings. Please refresh the page and try again.',
				'error'
			);
			$action = $new_channel_id > 0 ? "assign channel" : "remove channel";
			\error_log("Humix Plugin Error: Failed to " . $action . " - " . $e->getMessage());
			return $old_channel_id; // persist the old value
		}
		return $new_channel_id; // commit the new value
	}

	public static function on_adstxt_manager_id_option_change($new_adstxt_manager_id, $old_adstxt_manager_id, $option)
	{
		// Check if the new value is different from the old value
		if ($old_adstxt_manager_id === $new_adstxt_manager_id) {
			return $new_adstxt_manager_id;
		}

		// Allow user to pass empty string (or 0) to effectively clear out the value
		if ($new_adstxt_manager_id === "") {
			$new_adstxt_manager_id = 0;
		}

		// Check if the new value is a valid number
		if (!is_numeric($new_adstxt_manager_id) || $new_adstxt_manager_id < 0) {
			\add_settings_error(
				$option,
				'invalid_id',
				'Invalid ID number. Please enter a valid ID number.',
				'error'
			);
			return $old_adstxt_manager_id; // persist the old value
		}

		return $new_adstxt_manager_id; // commit the new value
	}
}