/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { columnsTemplate, verticalAlignment } = attributes;

	const wrapperClasses = classnames( {
		[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	return (
		<div style={ { '--columns-template': columnsTemplate } } className={ wrapperClasses }>
			<InnerBlocks.Content />
		</div>
	);
}
