/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

import { EZHX_REGEX } from './consts';

const getDefaultBlockAttrs = () => {
	const defaults = {};
	for (const [key, value] of Object.entries(metadata.attributes)) {
		if (value.hasOwnProperty('default')) {
			defaults[key] = value.default;
		}
	}
	return defaults;
}

const settings = {
	...metadata,
	edit: Edit,
	save: save,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/embed'],
				isMatch( attributes ) {
					
					return EZHX_REGEX.test(attributes.url);
					
				},
				transform( attributes ) {
					const humixAttributes = getDefaultBlockAttrs();
					humixAttributes.url = attributes.url;
					humixAttributes.displayType = 'url';
					return createBlock('humix/humix-block', humixAttributes);
				},
				priority: 2,
			},
			{
				type: 'raw',
				isMatch: ( node ) => {
					if (node.nodeName !== 'P') {
						return false;
					}
					return EZHX_REGEX.test( node.textContent );
				},
				transform: ( node ) => {
					const humixAttributes = getDefaultBlockAttrs();
					humixAttributes.url = node.textContent.trim();
					humixAttributes.displayType = 'url';
					return createBlock('humix/humix-block', humixAttributes);
				},
				priority: 1,
			},
		]
	}
};


/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, settings );
