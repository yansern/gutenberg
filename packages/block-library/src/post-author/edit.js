/**
 * WordPress dependencies
 */
import { useRef, useState } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	__experimentalUseColors,
	withFontSizes,
} from '@wordpress/block-editor';
import {
	Notice,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockColorsStyleSelector from './block-colors-selector';

function PostAuthorDisplay( { props, author } ) {
	const ref = useRef();

	const [ showAvatar, setShowAvatar ] = useState( true );
	const [ showDisplayName, setShowDisplayName ] = useState( true );

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

	const hasFirstOrLastNameSet = !! author.firstName || !! author.lastName;
	const authorName = showDisplayName && hasFirstOrLastNameSet ?
		[ author.firstName, author.lastName ].join( ' ' ) :
		author.name;

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
			<InspectorControls>
				<PanelBody title={ __( 'Author Settings' ) }>
					<ToggleControl
						label={ __( 'Show avatar' ) }
						checked={ showAvatar }
						onChange={ () => setShowAvatar( ! showAvatar ) }
					/>
					<ToggleControl
						label={ __( 'Show display name' ) }
						checked={ showDisplayName }
						onChange={ () => setShowDisplayName( ! showDisplayName ) }
					/>
					{ showDisplayName && ! hasFirstOrLastNameSet &&
						<Notice status="warning" isDismissible={ false }>
							{ __( 'This author does not have their name set' ) }
						</Notice>
					}
				</PanelBody>
			</InspectorControls>

			{ InspectorControlsColorPanel }

			<TextColor>
				<BackgroundColor>
					<div ref={ ref } className="wp-block-post-author">
						{ showAvatar &&
							<img src={ author.avatar_urls[ 24 ] } alt={ authorName } className="wp-block-post-author__avatar" />
						}
						<RichText
							className="wp-block-post-author__name"
							multiline={ false }
							value={ authorName }
						/>
					</div>
				</BackgroundColor>
			</TextColor>
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
