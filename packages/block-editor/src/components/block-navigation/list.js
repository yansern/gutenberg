/**
 * External dependencies
 */
import { isNil, map, omitBy } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import {
	__experimentalGetBlockLabel as getBlockLabel,
	getBlockType,
} from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import ButtonBlockAppender from '../button-block-appender';
import BlockMover from '../block-mover';

function NavigationItem( { block, onSelect, isSelected, hasBlockMovers } ) {
	const [ isHovered, setIsHovered ] = useState( false );
	const {
		name,
		clientId,
		attributes,
	} = block;
	const blockType = getBlockType( name );
	const blockDisplayName = getBlockLabel( blockType, attributes );

	return (
		// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
		<div
			className={ classnames( 'block-editor-block-navigation__item', {
				'is-selected': isSelected,
			} ) }
			onMouseEnter={ () => setIsHovered( true ) }
			onMouseLeave={ () => setIsHovered( false ) }
		>
			<Button
				className="block-editor-block-navigation__item-button"
				onClick={ onSelect }
			>
				<BlockIcon icon={ blockType.icon } showColors />
				{ blockDisplayName }
				{ isSelected && <span className="screen-reader-text">{ __( '(selected block)' ) }</span> }
			</Button>
			{ hasBlockMovers && (
				<BlockMover
					isHidden={ ! isHovered && ! isSelected }
					clientIds={ [ clientId ] }
				/>
			) }
		</div>
	);
}

export default function BlockNavigationList( {
	blocks,
	selectedBlockClientId,
	selectBlock,
	showAppender,

	// Internal use only.
	showNestedBlocks,
	showBlockMovers,
	parentBlockClientId,
	isRootItem = true,
} ) {
	const shouldShowAppender = showAppender && !! parentBlockClientId;
	const hasBlockMovers = showBlockMovers && blocks.length > 1;

	return (
		/*
		 * Disable reason: The `list` ARIA role is redundant but
		 * Safari+VoiceOver won't announce the list otherwise.
		 */
		/* eslint-disable jsx-a11y/no-redundant-roles */
		<ul className="block-editor-block-navigation__list" role={ isRootItem ? 'tree' : 'group' }>
			{ map( omitBy( blocks, isNil ), ( block ) => {
				const {
					clientId,
					innerBlocks,
				} = block;

				const isSelected = clientId === selectedBlockClientId;

				return (
					<li key={ clientId } role="treeitem">
						<NavigationItem
							block={ block }
							onSelect={ () => selectBlock( clientId ) }
							isSelected={ isSelected }
							hasBlockMovers={ hasBlockMovers }
						/>
						{ showNestedBlocks && !! innerBlocks && !! innerBlocks.length && (
							<BlockNavigationList
								blocks={ innerBlocks }
								selectedBlockClientId={ selectedBlockClientId }
								selectBlock={ selectBlock }
								parentBlockClientId={ clientId }
								showAppender={ showAppender }
								showBlockMovers={ showBlockMovers }
								showNestedBlocks
								isRootItem={ false }
							/>
						) }
					</li>
				);
			} ) }
			{ shouldShowAppender && (
				<li>
					<div className="block-editor-block-navigation__item">
						<ButtonBlockAppender
							rootClientId={ parentBlockClientId }
							__experimentalSelectBlockOnInsert={ false }
						/>
					</div>
				</li>
			) }
		</ul>
		/* eslint-enable jsx-a11y/no-redundant-roles */
	);
}
