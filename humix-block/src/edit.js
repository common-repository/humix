/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import MultiSelectDropdown from './multiselectDropdown';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useBlockEditContext, BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';

import { RadioControl, SelectControl, CheckboxControl, TextControl, Tooltip, Animate, Icon, Notice, __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup } from '@wordpress/components';

import { select } from '@wordpress/data';

import { parse, serialize } from '@wordpress/blocks';

import apiFetch from '@wordpress/api-fetch';

import { useState, useEffect, Fragment } from '@wordpress/element';

import axios from 'axios';

import CategorySelector from './categoryselector';

import humixlogo from './assets/humixlogo.png';

import cloneDeep from 'lodash/cloneDeep';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { createBlock } from '@wordpress/blocks';

import { EZHX_REGEX, OEMBED_BASE, EZHX_GENERATE_EMBED_CODE_BASE, VIDEO_CATEGORY_LIMIT, VIDEO_CATEGORIES, FEEDBACK_LINK } from './consts';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, attributes, setAttributes }) {
	const
		BEFORE_FIRST_PARAGRAPH = '0',
		UNDER_FIRST_PARAGRAPH = '1',
		UNDER_SECOND_PARAGRAPH = '2',
		MIDDLE_OF_PAGE = '3',
		BOTTOM_OF_PAGE = '4';

	const
		EDIT_BLOCK_MODE = 'edit',
		PREVIEW_BLOCK_MODE = 'preview',
		ADD_TO_POSTS_BLOCK_MODE = 'add_to_posts';

	const
		MATCH_BY_TOPIC = 'MATCH_BY_TOPIC',
		MATCH_BY_CATEGORY = 'MATCH_BY_CATEGORY',
		MATCH_OPTIONS = [
			{label: 'Match video by page topic', value: MATCH_BY_TOPIC},
			{label: 'Match video by category', value: MATCH_BY_CATEGORY},
		],
		ANY_SOURCE = 'ANY_SOURCE',
		NETWORK_VIDEOS_SOURCE = 'NETWORK_VIDEOS_SOURCE',
		MY_VIDEOS_SOURCE = 'MY_VIDEOS_SOURCE',
		SOURCE_OPTIONS = [
			{label: 'My videos & 3rd party network videos (recommended)', value: ANY_SOURCE},
			{label: '3rd party videos from Humix Network only', value: NETWORK_VIDEOS_SOURCE},
			{label: 'My videos only', value: MY_VIDEOS_SOURCE},
		];

	// These are used in the embed code generator API
	const
		MY_VIDEOS_AND_NETWORK_BY_TOPIC = 0,
		MY_VIDEOS_AND_NETWORK_BY_CAT = 1,
		NETWORK_ONLY_BY_TOPIC = 2,
		NETWORK_ONLY_BY_CAT = 3,
		MY_VIDEOS_ONLY_BY_TOPIC = 4,
		MY_VIDEOS_ONLY_BY_CAT = 5,
		MATCH_OPTION_MAP = {
			[`${ANY_SOURCE}-${MATCH_BY_TOPIC}`]: MY_VIDEOS_AND_NETWORK_BY_TOPIC,
			[`${ANY_SOURCE}-${MATCH_BY_CATEGORY}`]: MY_VIDEOS_AND_NETWORK_BY_CAT,
			[`${NETWORK_VIDEOS_SOURCE}-${MATCH_BY_TOPIC}`]: NETWORK_ONLY_BY_TOPIC,
			[`${NETWORK_VIDEOS_SOURCE}-${MATCH_BY_CATEGORY}`]: NETWORK_ONLY_BY_CAT,
			[`${MY_VIDEOS_SOURCE}-${MATCH_BY_TOPIC}`]: MY_VIDEOS_ONLY_BY_TOPIC,
			[`${MY_VIDEOS_SOURCE}-${MATCH_BY_CATEGORY}`]: MY_VIDEOS_ONLY_BY_CAT,
		};

	const
		PROPOGATE_SKIP_IF_VIDEO_EXISTS = 'skip_if_video_exists',
		PROPAGATE_REPLACE_ALL_VIDEOS = 'replace_all_videos',
		PROPAGATE_ADD_ANYWAY = 'add_anyway';

	const PROPAGATE_BLOCK_NOTICE_DURATION = 15000;

	// to use when rendering a different preview when the block isn't selected
	const context = useBlockEditContext();

	// to use for skipping current post id when adding across pages
	const selector = select('core/editor');

	let currentPost = null;
	if (selector) {
		currentPost = selector.getCurrentPost();
	}

	// Propagate to other posts tracking
	let
		tmpUpdatedPosts = 0, // posts that were updated
		tmpSkippedPosts = 0, // posts that were skipped due to having video already
		tmpIgnoredPosts = 0, // posts where location was not found
		tmpErrorPosts = 0; // posts that failed to update

	const { url, floatOption, displayType, html, autoplay, loop, category, matchOption, matchCategories, videoSourceOption } = attributes;

	const [ embedURL, setEmbedURL ] = useState( url );
	const [ floatOptionVal, setFloatOptionVal ] = useState( floatOption );
	const [ displayTypeVal, setDisplayTypeVal ] = useState( displayType );
	const [ embedHTML, setEmbedHTML ] = useState( html );
	const [ autoplayVal, setAutoplayVal ] = useState( autoplay );
	const [ loopVal, setLoopVal ] = useState( loop );
	const [ selectedCategory, setSelectedCategory ] = useState( category );
	const [ selectedLocation, setSelectedLocation ] = useState(UNDER_FIRST_PARAGRAPH);
	const [ isPropagatingBlock, setIsPropagatingBlock ] = useState(false);
	const [ didPropagateBlock, setDidPropagateBlock ] = useState(false);
	const [ propagateOption, setPropagateOption ] = useState(PROPOGATE_SKIP_IF_VIDEO_EXISTS);
	const [ updatedCount, setUpdatedCount ] = useState(0);
	const [ propagateBlockError, setPropagateBlockError ] = useState(false);
	const [ selectedMatchOption, setSelectedMatchOption ] = useState( matchOption || MATCH_BY_TOPIC );
	const [ selectedMatchCategories, setSelectedMatchCategories ] = useState( matchCategories || [] );
	const [ selectedVideoSourceOption, setSelectedVideoSourceOption ] = useState( videoSourceOption || ANY_SOURCE );
	const [ addToPostsCount, setAddToPostsCount ] = useState(0);
	const [ skippedPostsCount, setSkippedPostsCount ] = useState(0);
	const [ ignoredPosts, setIgnoredPosts ] = useState(0);
	const [ errorPosts, setErrorPosts ] = useState(0);
	const [ propagateProgress, setPropagateProgress ] = useState(0);

	const isValidConfig = () => {
		if (displayTypeVal === "auto") {
			if (matchOption === MATCH_BY_TOPIC) {
				return true;
			}
			return selectedMatchCategories && selectedMatchCategories.length > 0 && selectedMatchCategories.length <= 3;
		}
		return isValidUrl(embedURL);
	}

	const isValidUrl = (val) => {
		return EZHX_REGEX.test(val);
	}

	const [ blockMode, setBlockMode ] = useState( isValidConfig() ? PREVIEW_BLOCK_MODE : EDIT_BLOCK_MODE);

	const ALIGNMENT_CONTROLS = ["left", "center", "right"];

	/**
	 * Determines approximate location of Humix block with respect to paragraph blocks
	 * to provide a default selection for the propagate to location feature
	 */
	const determineBlockLocationInPost = () => {
		if (!selector) return;
		let numParagraphs = 0;
		const blocks = selector.getBlocks();
		blocks.forEach((block, i) => {
			if (block.name === 'core/paragraph') {
				numParagraphs++;
			}
			if (block.clientId === clientId) {
				if (numParagraphs === 0) {
					setSelectedLocation(BEFORE_FIRST_PARAGRAPH);
				} else if (numParagraphs === 1) {
					setSelectedLocation(UNDER_FIRST_PARAGRAPH);
				} else if (numParagraphs === 2) {
					setSelectedLocation(UNDER_SECOND_PARAGRAPH);
				} else if (i < blocks.length / 2) {
					setSelectedLocation(MIDDLE_OF_PAGE);
				} else {
					setSelectedLocation(BOTTOM_OF_PAGE);
				}
			}
		});
	}

	const markCategoriesAsSelected = (categoryList) => {
		categoryList.forEach((c) => {
			c.checked = selectedMatchCategories.includes(c.id);
			if (c.children) {
				c.children = markCategoriesAsSelected(c.children);
			}
		});
		return categoryList;
	}

	const addSelectionsToCategoryTree = () => {
		return markCategoriesAsSelected(cloneDeep(VIDEO_CATEGORIES));
	}

	useEffect(determineBlockLocationInPost, []);

	useEffect(() => {
		setAttributes({url: embedURL});
		if (isValidUrl(embedURL)) {
			fetchOEmbedHTML();
		}
	}, [embedURL]);

	useEffect(() => {
		setAttributes({floatOption: floatOptionVal});
		if (isValidConfig()) {
			fetchOEmbedHTML();
		}
	}, [floatOptionVal]);

	useEffect(() => {
		setAttributes({displayType: displayTypeVal});
		if (displayTypeVal === "auto") {
			setEmbedURL("");
		}
		fetchOEmbedHTML();
	}, [displayTypeVal]);

	useEffect(() => {
		setAttributes({html: embedHTML});
	}, [embedHTML]);

	useEffect(() => {
		setAttributes({autoplay: autoplayVal});
		if (isValidConfig()) {
			fetchOEmbedHTML();
		}
	}, [autoplayVal]);

	useEffect(() => {
		setAttributes({loop: loopVal});
		if (isValidConfig()) {
			fetchOEmbedHTML();
		}
	}, [loopVal]);

	useEffect(() => {
		setAttributes({category: selectedCategory});
	}, [selectedCategory]);

	useEffect(() => {
		// pub can select more than 3 categories, but we can only save 3 categories max
		setAttributes({matchCategories: selectedMatchCategories.slice(0, VIDEO_CATEGORY_LIMIT)});
		if (isValidConfig()) {
			fetchOEmbedHTML();
		}
	}, [selectedMatchCategories]);

	useEffect(() => {
		setAttributes({matchOption: selectedMatchOption});
		if (isValidConfig()) {
			fetchOEmbedHTML();
		}
	}, [selectedMatchOption]);

	useEffect(() => {
		setAttributes({videoSourceOption: selectedVideoSourceOption});
		if (isValidConfig()) {
			fetchOEmbedHTML();
		}
	}, [selectedVideoSourceOption]);

	const updatePropagateProgress = () => {
		if (addToPostsCount === 0) {
			setPropagateProgress(0);
			return;
		}
		setPropagateProgress(Math.floor((updatedCount + skippedPostsCount + ignoredPosts + errorPosts) / addToPostsCount * 100));
	}

	useEffect(updatePropagateProgress, [updatedCount, skippedPostsCount, ignoredPosts, errorPosts]);

	const updateDisplayType = (val) => {
		setDisplayTypeVal(val);
	}

	const updateFloatOption = (val) => {
		setFloatOptionVal(val);
	}

	const updateAutoplay = (val) => {
		setAutoplayVal(val);
	}

	const updateLoop = (val) => {
		setLoopVal(val);
	}

	const updateCategoryVal = (val) => {
		setSelectedCategory(val);
	}

	const updateSelectedLocationVal = (val) => {
		setSelectedLocation(val);
	}

	const updatePropagateOption = (val) => {
		setPropagateOption(val);
	}

	const updateAlignment = (val) => {
		setAttributes({alignment: val});
	}

	const updateMatchCategories = (newSelection, currentSelections) => {
		setSelectedMatchCategories(currentSelections.map(c => c.id));
	}

	const generateJSON = (
		{
			autoplay=false,
			floatOption=true,
			videoId="",
			autoMatch=false,
			startTime=0, 		// TODO: allow customization
			width=640, 			// TODO: allow customization
			height=360,  		// TODO: allow customization
			preview=false,		// TODO: allow customization
			embedCodeSource="w"
		} = {}
	) => {

		// set required options first
		const settings = {
			auto_play: autoplay,
			float: floatOption,
			width: width,
			height: height,
			embed_code_source: embedCodeSource,
		};

		// either videoId exists or automatch exists
		// TODO: enforce check here
		if (videoId) {
			settings.videoId = videoId;
		}

		if (autoMatch) {
			settings.auto_match = true;
			const isCategoryMatch = selectedMatchOption === MATCH_BY_CATEGORY;
			let apiAutoMatchOption = MATCH_OPTION_MAP[`${selectedVideoSourceOption}-${selectedMatchOption}`];
			if (apiAutoMatchOption === undefined) {
				console.error("Unexpected source-match option combination");
				// Use best-fit default setting, should have proper error handling but unlikely this error will occurr
				apiAutoMatchOption = isCategoryMatch ? MY_VIDEOS_AND_NETWORK_BY_CAT : MY_VIDEOS_AND_NETWORK_BY_TOPIC;
			}
			settings.auto_match_option = MATCH_OPTION_MAP[`${selectedVideoSourceOption}-${selectedMatchOption}`];

			if (isCategoryMatch) {
				settings.match_category_ids = selectedMatchCategories.map(id => parseInt(id));
			}
		}

		if (startTime > 0) {
			settings.time_start = startTime;
		}

		if (preview) {
			settings.preview = preview;
		}

		return JSON.stringify(settings);
	}

	const generatePlaylistURL = (baseURL) => {
		let requestURL = baseURL;

		let parts = embedURL.split("/");
		if (!parts) {
			return;
		}
		parts = parts[parts.length - 1].split("?");
		if (!parts) {
			return;
		}

		// safely get the videoId (playlistId)
		const videoId = parts[0];

		const settings = generateJSON(
			{
				autoplay: !!autoplayVal,
				floatOption: !!floatOptionVal,
				videoId: videoId,
			}
		);

		// should never fail here
		if (!settings) {
			return;
		}

		return requestURL + settings;
	}

	const generateSingleVideoURL = (baseURL) => {
		let requestURL = baseURL;
		requestURL += embedURL;
		requestURL += `&float=${floatOptionVal}`;
		requestURL += `&autoplay=${autoplayVal}`;
		requestURL += `&loop=${loopVal}`;
		return requestURL;
	}

	const generateAutoMatchURL = (baseURL) => {
		let requestURL = baseURL;
		const settings = generateJSON({
			autoplay: !!autoplayVal,
			floatOption: !!floatOptionVal,
			autoMatch: true,
		});

		// should never fail here
		if (!settings) {
			return;
		}

		return requestURL + settings;
	}

	const fetchOEmbedHTML = async () => {
		let requestURL = "";

		if (displayTypeVal !== "auto" && !embedURL) {
			return;
		} else if (displayTypeVal === "url" && embedURL && embedURL.includes("/playlist")) {
			requestURL = generatePlaylistURL(EZHX_GENERATE_EMBED_CODE_BASE);
			if (!requestURL) {
				return;
			}

		} else if (displayType === "url" && embedURL) {
			requestURL = generateSingleVideoURL(OEMBED_BASE);
			if (!requestURL) {
				return;
			}
		} else {
			requestURL = generateAutoMatchURL(EZHX_GENERATE_EMBED_CODE_BASE);
			if (!requestURL) {
				return;
			}
		}

		const response = await axios({
			method: 'get',
			url: requestURL
		});

		if (response && response.data) {
			const jsonData = response.data;

			// save response from oembed link if available
			if (jsonData['html']) {
				setEmbedHTML(jsonData['html']);
			} else {
				setEmbedHTML(jsonData);
			}
			if (jsonData['provider_name']) {
				setAttributes({providerSlug: jsonData['provider_name']});
			} else {
				setAttributes({providerSlug: "Humix"});
			}
		}

	}


	const addAtLocation = (postBlocks, newBlock) => {
		const humixVideoExistsOnPage = postBlocks.some(b => {
			if (b.name === 'humix/humix-block') return true;
			if (b.name === 'core/shortcode' && typeof b.originalContent === 'string' && b.originalContent.includes('[humix')) return true;
			// hacky check to get other embeds
			if (typeof b.originalContent === 'string' && b.originalContent.includes('id="humix-')) return true;
			return false;
		});

		// we're skipping because of humix videos already on the page
		if (propagateOption === PROPOGATE_SKIP_IF_VIDEO_EXISTS && humixVideoExistsOnPage) {
			tmpSkippedPosts++;
			setSkippedPostsCount(tmpSkippedPosts);
			return false;
		};

		// if we get past here then we're updating a post

		if (propagateOption === PROPAGATE_REPLACE_ALL_VIDEOS && humixVideoExistsOnPage) {
			let tempBlocks = [];
			postBlocks.forEach((b) => {

				// skip adding these blocks to temp blocks
				if (b.name === 'humix/humix-block') return;
				if (b.name === 'core/shortcode' && typeof b.originalContent === 'string' && b.originalContent.includes('[humix')) return;
				// hacky check to get other embeds
				if (typeof b.originalContent === 'string' && b.originalContent.includes('id="humix-')) return;
				tempBlocks.push(b);
			});

			// remove the other embeds, then update like normal
			postBlocks = [...tempBlocks];
		}


		switch(selectedLocation) {
			case BEFORE_FIRST_PARAGRAPH:
				postBlocks.unshift(newBlock);
				return postBlocks;
			case UNDER_FIRST_PARAGRAPH:
				let newPostBlocksOne = [];
				let counterOne = 0;
				postBlocks.forEach((b) => {
					newPostBlocksOne.push(b);
					if (b.name === 'core/paragraph') {
						counterOne++;
					}
					if (counterOne === 1) {
						newPostBlocksOne.push(newBlock);
					}
				});
				// if we return false here that means we didn't add anything new
				if (newPostBlocksOne.length === postBlocks.length) {
					tmpIgnoredPosts++;
					setIgnoredPosts(tmpIgnoredPosts);
					return false;
				}
				return newPostBlocksOne;
			case UNDER_SECOND_PARAGRAPH:
				let newPostBlocksTwo = [];
				let counterTwo = 0;
				postBlocks.forEach((b) => {
					newPostBlocksTwo.push(b);
					if (b.name === 'core/paragraph') {
						counterTwo++;
					}
					if (counterTwo === 2) {
						newPostBlocksTwo.push(newBlock);
					}
				});
				// if we return false here that means we didnt add anything new
				if (newPostBlocksTwo.length === postBlocks.length) {
					tmpIgnoredPosts++;
					setIgnoredPosts(tmpIgnoredPosts);
					return false;
				}
				return newPostBlocksTwo;
			case MIDDLE_OF_PAGE:
				let middle = Math.floor(postBlocks.length / 2);
				postBlocks.splice(middle, 0, newBlock);
				return postBlocks;
			case BOTTOM_OF_PAGE:
				postBlocks.push(newBlock);
				return postBlocks;
			default:
				return postBlocks;
		}
	}

	const getPreviewEmbedUrl = () => {
		const urlParts = embedURL.split("/");
		const vidId = urlParts[urlParts.length - 1].split("?")[0];
		let url = "https://humix.com/embed?contentId=" + vidId + "&play_nextvid=0";
		if (!autoplayVal) {
			url += "&autoplay=0";
		}
		if (loopVal) {
			url += "&loop=1"; // Note: doesn't seem to work, could not find any docs on looping via iframe but not super important
		}
		return url;
	}

	const showPreview = () => {
		if (!isValidConfig()) {
			return;
		}
		setBlockMode(PREVIEW_BLOCK_MODE);
	}

	const showEdit = () => {
		setBlockMode(EDIT_BLOCK_MODE);
	}

	const showAddToPosts = () => {
		if (!isValidConfig()) {
			return;
		}
		setBlockMode(ADD_TO_POSTS_BLOCK_MODE);
	}

	const resetPropagateTotals = () => {
		tmpUpdatedPosts = 0;
		tmpSkippedPosts = 0;
		tmpIgnoredPosts = 0;
		tmpErrorPosts = 0;
		setIgnoredPosts(0);
		setErrorPosts(0);
		setAddToPostsCount(0);
		setUpdatedCount(0);
		setSkippedPostsCount(0);
	}

	const propagateBlock = async () => {
		if (!embedHTML) return;
		if (isPropagatingBlock) return;
		resetPropagateTotals();
		setIsPropagatingBlock(true);
		let url = '/wp/v2/posts?context=edit';

		if (parseInt(selectedCategory) > 0) {
			url += `&categories=${selectedCategory}`;
		}

		const allPosts = await apiFetch({
			path: url,
			method: 'GET',
		}).catch(e => {
			console.error(e);
			let hasError = true;
			propogateBlockComplete(hasError);
			return;
		});

		// safety check
		if (!Array.isArray(allPosts)) {
			let hasError = true;
			propogateBlockComplete(hasError);
			return;
		}

		const currentPostId = currentPost.id;
		const posts = allPosts.filter(p => p.id !== currentPostId);

		setAddToPostsCount(posts.length);

		// map the posts to promises
		let promises = posts.map((post) => {

			let postBlocks = parse(post.content.raw);

			const newBlock = createBlock(context.name, attributes);

			let updatedBlocks = addAtLocation(postBlocks, newBlock);

			// hack to just skip the post in question
			if (!updatedBlocks) {
				return Promise.resolve();
			}

			const updatedContent = serialize(updatedBlocks);

			return apiFetch({
				path: `/wp/v2/posts/${post.id}`,
				method: 'POST',
				data: {content: updatedContent},
			}).then(() => {
				tmpUpdatedPosts++;
				setUpdatedCount(tmpUpdatedPosts);
			}).catch(e => {
				console.error(e);
				tmpErrorPosts++;
				setErrorPosts(tmpErrorPosts);
			});
		});

		await Promise.all(promises);

		propogateBlockComplete();
	}

	const propogateBlockComplete = (hasError = false) => {
		setIsPropagatingBlock(false);
		setDidPropagateBlock(!hasError);
		setPropagateBlockError(hasError);
		showPreview();
		setTimeout(() => {
			setDidPropagateBlock(false);
			setPropagateBlockError(false);
			setUpdatedCount(0);
		}, PROPAGATE_BLOCK_NOTICE_DURATION);
	}

	const getSelectedCategoryLabels = (categoryList, labels) => {
		categoryList.forEach((c) => {
			if (matchCategories.includes(c.id)) {
				labels.push(c.label);
			}
			if (c.children) {
				getSelectedCategoryLabels(c.children, labels);
			}
		});
	}

	const openFeedbackLink = (event) => {
		event.preventDefault();
		window.open(FEEDBACK_LINK, "_blank");
	}

	const getAutoSelectPreviewDescription = () => {
		let msg = "Humix AI will choose an appropriate video to play ";
		if (selectedVideoSourceOption !== ANY_SOURCE) {
			msg += selectedVideoSourceOption === NETWORK_VIDEOS_SOURCE ? "from the Humix Network " : "from your videos ";
		}
		if (matchOption === MATCH_BY_TOPIC) {
			msg += "based on the contents of the page";
			return msg;
		}
		const labels = [];
		getSelectedCategoryLabels(VIDEO_CATEGORIES, labels);
		if(labels.length === 0) {
			// This condition shouldn't occur, but just in case
			return "";
		}
		msg += "that matches the ";
		if (labels.length === 1) {
			return msg + `"${labels[0]}" category`;
		}
		if (labels.length === 2) {
			return  msg + `"${labels[0]}" or "${labels[1]}" categories`;
		}
		return msg + `"${labels[0]}", "${labels[1]}", or "${labels[2]}" categories`;
	}
	return (
		<div { ...useBlockProps() }>
			{
				<BlockControls>
					<BlockAlignmentToolbar
						value={attributes.alignment}
						onChange={updateAlignment}
						controls={ALIGNMENT_CONTROLS}
					></BlockAlignmentToolbar>
				</BlockControls>
			}
			{ blockMode === PREVIEW_BLOCK_MODE && embedHTML != "" && (
				<div className='preview-block'>
					<div class="preview-btn-group">
						<button onClick={showEdit} aria-label='Edit Video Settings' style={{marginRight: "15px"}}>
							Edit
						</button>
						<button onClick={showAddToPosts}>
							Add to Other Posts
						</button>
					</div>
					{ displayTypeVal !== "auto" && (
						<iframe src={getPreviewEmbedUrl()}></iframe>
					)}
					{ displayTypeVal === "auto" && (
						<div className="auto-select-preview">
							<h3>Auto-Select Video</h3>
							<p>
								{getAutoSelectPreviewDescription()}
							</p>
						</div>
					)}
					{(didPropagateBlock || propagateBlockError) && (
						<div class="propagate-notice">
							{didPropagateBlock && (
								<Animate type="slide-in" options={ { origin: 'top' } }>
									{ () => (
										<Notice status={updatedCount > 0 ? 'success' : 'warning'} isDismissible={false}>
											{ updatedCount > 0 && (
												<p>
													<Icon icon="saved" className='ezhx-success'></Icon>
													Humix video added to <strong>{ updatedCount }</strong> other post{updatedCount === 1 ? '' : 's'}!
												</p>
											)}
											{ updatedCount === 0 && (
												<p>
													<Icon icon="warning" className='ezhx-warning'></Icon>
													No Humix videos were added to other posts
												</p>
											)}
											{/* Info about posts that could have been updated but were not (skipped, no applicable location, error) */}
											{updatedCount !== addToPostsCount && addToPostsCount > 0 && (
												<ul>
													{ skippedPostsCount > 0 && (
														<li>
															<strong>{ skippedPostsCount }</strong> post{skippedPostsCount === 1 ? ' was skipped because it already has' : 's were skipped because they already have'} a Humix video
														</li>
													)}

													{ ignoredPosts > 0 && (
														<li>
															<strong>{ ignoredPosts }</strong> post{ignoredPosts === 1 ? '' : 's'} did not have an appropriate location to add the video to
														</li>
													)}

													{ errorPosts > 0 && (
														<li>
															<strong>{ errorPosts }</strong> post{errorPosts === 1 ? '' : 's'} failed to update due to an internal error, please try again
														</li>
													)}
												</ul>
											)}
										</Notice>
									) }
								</Animate>	)}
							{propagateBlockError && (
								<Animate type="slide-in" options={ { origin: 'top' } }>
									{ () => (
										<Notice status="error" isDismissible={false}>
											<p>
												<Icon icon="warning" className='ezhx-error'></Icon>
												There was an error adding the Humix video to other pages
											</p>
										</Notice>
									) }
								</Animate>)}
						</div>
					)}
				</div>
			)}
			{ blockMode === EDIT_BLOCK_MODE && (
				<div className="edit-block">
					<div style={{height: "35px", maxWidth: "150px", marginBottom: "20px"}}>
						<a href="https://www.humix.com/" target="_blank">
							<img src={humixlogo}/>
						</a>
					</div>
					<div className='humix-display-type-radio-group'>
						<RadioGroup
							checked={displayType}
							onChange={updateDisplayType}
						>
							<Tooltip text="Let Humix AI choose an appropriate video">
								<Radio value="auto">Auto Select</Radio>
							</Tooltip>
							<Radio value="url">Use Humix Link</Radio>
						</RadioGroup>
					</div>
					<div style={{marginBottom: "18px"}}></div>
					{ displayType === "url" && (
						<div>
							<p for="humix-url-input" style={{fontSize: "small", marginBottom: "20px"}}>
								Please provide a link to the video or playlist you'd like to serve on your website. You can easily copy the links from either <a href="https://pubdash.ezoic.com/humix/studio/videos" target='_blank'>Humix Studio</a> or <a href="https://www.humix.com" target="_blank">Humix.com</a>. For additional details, please refer to <a href="https://support.ezoic.com/scp/article.php?id=595" target="_blank">this article</a>.
							</p>
							<TextControl
								id='humix-url-input'
								label='Video or Playlist URL'
								value={embedURL}
								placeholder='Enter URL here'
								onChange={setEmbedURL}
							>
							</TextControl>
						</div>
					)}
					{ displayType === "auto" && (
						<div>
							<p>Video Match Settings</p>
							<RadioControl
								label="Choose the source(s) that Humix can play videos from"
								onChange={setSelectedVideoSourceOption}
								selected={selectedVideoSourceOption}
								options={SOURCE_OPTIONS}
							/>
							<div style={{marginTop: "15px"}}>
								<RadioControl
									label="Choose how Humix selects a match for this video"
									onChange={setSelectedMatchOption}
									selected={selectedMatchOption}
									options={MATCH_OPTIONS.map(option => ({
										...option,
										label: (
											<Fragment>
											{option.label}
											{option.value === MATCH_BY_TOPIC && (
												<Tooltip text="Humix will detect your page's content and find a relevant video that matches the page topic">
													<Icon icon="info" style={{marginLeft: "4px"}}></Icon>
												</Tooltip>
											)}
											{option.value === MATCH_BY_CATEGORY && (
												<Tooltip text="Humix will serve videos that match your chosen categories">
													<Icon icon="info" style={{marginLeft: "4px"}}></Icon>
												</Tooltip>
											)}
											</Fragment>
										),
										}))}
								></RadioControl>
							</div>
							{ selectedMatchOption === MATCH_BY_CATEGORY && (
								<div style={{marginTop: "15px"}}>
									<label for="match-categories" class="video-match-categories__label">
										Select up to 3 categories for video matching
										{ selectedMatchCategories.length > VIDEO_CATEGORY_LIMIT && (
											<span style={{color: "red"}}> (only 3 categories are allowed)</span>
										)}
									</label>
									<MultiSelectDropdown
										id="match-categories"
										data={addSelectionsToCategoryTree()}
										mode="hierarchical"
										keepTreeOnSearch={true}
										keepChildrenOnSearch={true}
										keepOpenOnSelect={true}
										texts={{ placeholder: 'Search...' }}
										currentSelections={selectedMatchCategories}
										onChange={updateMatchCategories}
									/>
								</div>
							)}
						</div>
					)}
					<div style={{marginBottom: "18px"}}></div>
					<hr/>
					<p>Video Playback Settings</p>
					<CheckboxControl
						label="Float"
						style={{marginBottom: "8px"}}
						checked={ floatOption }
						onChange={ updateFloatOption }
					></CheckboxControl>
					<CheckboxControl
						label="Auto Play"
						checked={ autoplay }
						onChange={ updateAutoplay }
					></CheckboxControl>
					<CheckboxControl
						label="Loop"
						checked={ loop }
						onChange={ updateLoop }
					></CheckboxControl>
					{ currentPost && (
						<span></span>
					)}
					<div class="ezhx-btn-group">
						<button onClick={showPreview} disabled={!isValidConfig()}>
							Done
						</button>
						<button onClick={showAddToPosts} disabled={!isValidConfig()}>
							Done & Add to Other Posts
						</button>
					</div>
					<div class="share-feedback-container">
						<a class="share-feedback-text" onClick={openFeedbackLink}>
							Share Feedback
						</a>
					</div>
				</div>
			)}
			<div className="edit-block" style={{display: blockMode === ADD_TO_POSTS_BLOCK_MODE ? "block": "none"}}>
				<div style={{height: "35px", maxWidth: "150px", marginBottom: "20px"}}>
					<a href="https://www.humix.com/" target="_blank">
						<img src={humixlogo}/>
					</a>
				</div>
				<div style={{marginBottom: "15px"}}>Add this Humix Video to other posts in your site</div>
				<p>
					<CategorySelector
						disabled={isPropagatingBlock}
						attributes={attributes}
						updateSelectedCategory={updateCategoryVal}
					></CategorySelector>
				</p>
				<p>
					<SelectControl
						label="Choose location in post to add this video:"
						disabled={isPropagatingBlock}
						onChange={updateSelectedLocationVal}
						value={selectedLocation}
						options={
							[
								{label: 'Before 1st paragraph', value: BEFORE_FIRST_PARAGRAPH},
								{label: 'Under 1st paragraph (recommended)', value: UNDER_FIRST_PARAGRAPH},
								{label: 'Under 2nd paragraph', value: UNDER_SECOND_PARAGRAPH},
								{label: 'Middle of page', value: MIDDLE_OF_PAGE},
								{label: 'Bottom of page', value: BOTTOM_OF_PAGE},
							]
						}
					/>
				</p>
				<p>
					<RadioControl
						label="If post already has one or more Humix Videos:"
						disabled={isPropagatingBlock}
						onChange={updatePropagateOption}
						selected={propagateOption}
						options={
							[
								{label: 'Skip adding this video', value: PROPOGATE_SKIP_IF_VIDEO_EXISTS},
								{label: 'Remove existing videos and add this one', value: PROPAGATE_REPLACE_ALL_VIDEOS},
								{label: 'Add this video without affecting other videos', value: PROPAGATE_ADD_ANYWAY}

							]
						}
					></RadioControl>
				</p>
				{ isPropagatingBlock && addToPostsCount > 0 && (
					<Notice status='info' isDismissible={false} className='ezhx-notice__loading'>
						<p>
							<Icon icon="update" className="ezhx-loading ezhx-info"></Icon>
							<span>Adding video to <strong>{addToPostsCount}</strong> posts... ({propagateProgress}%)</span>
						</p>
					</Notice>
				)}
				<div class="ezhx-btn-group">
					<button disabled={isPropagatingBlock} onClick={showPreview} style={{backgroundColor: "white"}}>
						Cancel
					</button>
					<button disabled={isPropagatingBlock} onClick={propagateBlock}>
						Add to Posts
					</button>
				</div>
			</div>
		</div>
	);
}
