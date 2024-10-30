<?php
/**
 * Plugin Name:       Humix Block
 * Description:       Custom Humix block for embedding videos from the Humix Video Network
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       humix-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly     

function EZHX_create_block_humix_block_block_init() { 
	register_block_type( __DIR__ . '/build/block.json' );
}



// Hook: Block assets.
add_action( 'init', 'EZHX_create_block_humix_block_block_init' );

// Load Humix icon
function EZHX_register_humix_icon() {
	wp_register_style( 'humix-icon-style', plugins_url( './src/assets/humix-icon.css', __FILE__ ) );
}
  
add_action( 'init', 'EZHX_register_humix_icon' );

function EZHX_enqueue_humix_icon_style() {
	wp_enqueue_style( 'humix-icon-style' );
}

add_action( 'enqueue_block_editor_assets', 'EZHX_enqueue_humix_icon_style' );
add_action( 'wp_enqueue_scripts', 'EZHX_enqueue_humix_icon_style' );
