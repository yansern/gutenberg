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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import ButtonBlockAppender from '../button-block-appender';
import BlockMover from '../block-mover';

export default function BlockNavigationList( {
	blocks,
	selectedBlockClientId,
	selectBlock,
	showAppender,

	// Internal use only.
	showNestedBlocks,
	showMovers,
	parentBlockClientId,
	isRootItem = true,
} ) {
	const shouldShowAppender = showAppender && !! parentBlockClientId;
	const hasMovers = showMovers && blocks.length > 1;

	return (
		/*
		 * Disable reason: The `list` ARIA role is redundant but
		 * Safari+VoiceOver won't announce the list otherwise.
		 */
		/* eslint-disable jsx-a11y/no-redundant-roles */
		<ul className="block-editor-block-navigation__list" role={ isRootItem ? 'tree' : 'group' }>
			{ map( omitBy( blocks, isNil ), ( block ) => {
				const blockType = getBlockType( block.name );
				const isSelected = block.clientId === selectedBlockClientId;
				const blockDisplayName = getBlockLabel( blockType, block.attributes );

				return (
					<li key={ block.clientId } role="treeitem" aria-label={ blockDisplayName }>
						<div
							className={ classnames( 'block-editor-block-navigation__item', {
								'is-selected': isSelected,
							} ) }
						>
							<Button
								className="block-editor-block-navigation__item-button"
								onClick={ () => selectBlock( block.clientId ) }
							>
								<BlockIcon icon={ blockType.icon } showColors />
								{ blockDisplayName }
								{ isSelected && <span className="screen-reader-text">{ __( '(selected block)' ) }</span> }
							</Button>
							{ hasMovers && ( <BlockMover clientIds={ [ block.clientId ] } /> ) }
						</div>
						{ showNestedBlocks && !! block.innerBlocks && !! block.innerBlocks.length && (
							<BlockNavigationList
								blocks={ block.innerBlocks }
								selectedBlockClientId={ selectedBlockClientId }
								selectBlock={ selectBlock }
								parentBlockClientId={ block.clientId }
								showAppender={ showAppender }
								showMovers={ showMovers }
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
