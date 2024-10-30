/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

import { RawHTML } from '@wordpress/element';






/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();

	const { html, alignment } = attributes;

	let alignmentObj = {
		justifyContent: "center"
	};

	if (alignment === "left") {
		alignmentObj.justifyContent = "flex-start";
	} else if (alignment === "right") {
		alignmentObj.justifyContent = "flex-end";
	}
	

	return (
		<div { ...blockProps } style={alignmentObj}>
			{/* Start of block attributes */}
      		{/* url: {attributes.url} */}
      		{/* floatOption: {attributes.floatOption} */}
			{/* autoplay: {attributes.autoplay} */}
			{/* loop: {attributes.loop} */}
			{/* displayType: {attributes.displayType} */}
      		{/* End of block attributes */}
			<RawHTML>{ html }</RawHTML>
		</div>
	);
}
