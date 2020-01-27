/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';
import {
	AlignmentToolbar,
	BlockControls,
	RichText,
	__experimentalUseColors,
	withFontSizes,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import BlockColorsStyleSelector from './block-colors-selector';

function PostAuthorDisplay( { props, author } ) {
	const ref = useRef();

	const { setAttributes, fontSize } = props;

	const {
		TextColor,
		BackgroundColor,
		InspectorControlsColorPanel,
		ColorPanel,
	} = __experimentalUseColors(
		[
			{ name: 'textColor', property: 'color' },
			{ name: 'backgroundColor', className: 'background-color' },
		],
		{
			contrastCheckers: [ { backgroundColor: true, textColor: true, fontSize: fontSize.size } ],
			colorDetector: { targetRef: ref },
			colorPanelProps: {
				initialOpen: true,
			},
		},
		[ fontSize.size ]
	);

	setAttributes( {
		author,
	} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar />
				<BlockColorsStyleSelector
					TextColor={ TextColor }
					BackgroundColor={ BackgroundColor }
				>

					{ ColorPanel }

				</BlockColorsStyleSelector>
			</BlockControls>

			{ InspectorControlsColorPanel }

			<div ref={ ref } className="wp-block-post-author">
				<img src={ author.avatar_urls[ 24 ] } alt={ author.name } className="wp-block-post-author__avatar" />
				<RichText
					className="wp-block-post-author__name"
					multiline={ false }
					value={ author.name }
				/>
			</div>
		</>
	);
}

function PostAuthorEdit( props ) {
	const [ authorId ] = useEntityProp( 'postType', 'post', 'author' );
	const author = useSelect(
		( select ) => select( 'core' ).getEntityRecord( 'root', 'user', authorId ),
		[ authorId ]
	);

	if ( ! author ) {
		return 'Post Author Placeholder';
	}

	return <PostAuthorDisplay props={ props } author={ author } />;
}

export default withFontSizes( 'fontSize' )( PostAuthorEdit );
