/**
 * External dependencies
 */
import { isNil, map, omitBy } from 'lodash';
import { animated } from 'react-spring/web.cjs';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import {
	__experimentalGetBlockLabel as getBlockLabel,
	getBlockType,
} from '@wordpress/blocks';
import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import ButtonBlockAppender from '../button-block-appender';
import BlockMover from '../block-mover';
import useMovingAnimation from '../use-moving-animation';

function NavigationList( { blocks, selectBlock, selectedBlockClientId, showAppender, showBlockMovers, showNestedBlocks, parentBlockClientId } ) {
	const hasMultipleBlocks = blocks.length > 1;
	const isTreeRoot = ! parentBlockClientId;

	return (
		/*
		 * Disable reason: The `list` ARIA role is redundant but
		 * Safari+VoiceOver won't announce the list otherwise.
		 */
		/* eslint-disable jsx-a11y/no-redundant-roles */
		<ul className="block-editor-block-navigation__list" role={ isTreeRoot ? 'tree' : 'group' }>
			{ map( omitBy( blocks, isNil ), ( block, index ) => {
				return (
					<NavigationBlock
						key={ block.clientId }
						block={ block }
						selectBlock={ selectBlock }
						selectedBlockClientId={ selectedBlockClientId }
						position={ index }
						hasSiblings={ hasMultipleBlocks }
						showAppender={ showAppender }
						showBlockMovers={ showBlockMovers }
						showNestedBlocks={ showNestedBlocks }
					/>
				);
			} ) }
			{ showAppender && hasMultipleBlocks && ! isTreeRoot && (
				<li>
					<div className="block-editor-block-navigation__item is-appender">
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

function NavigationBlock( { block, selectBlock, selectedBlockClientId, position, hasSiblings, showAppender, showBlockMovers, showNestedBlocks } ) {
	const [ isHovered, setIsHovered ] = useState( false );
	const [ isSelectionButtonFocused, setIsSelectionButtonFocused ] = useState( false );
	const {
		name,
		clientId,
		attributes,
		innerBlocks,
	} = block;
	const blockType = getBlockType( name );
	const blockDisplayName = getBlockLabel( blockType, attributes );

	const wrapper = useRef( null );
	const isSelected = clientId === selectedBlockClientId;
	const adjustScrolling = false;
	const enableAnimation = true;
	const animateOnChange = position;

	const style = useMovingAnimation( wrapper, isSelected, adjustScrolling, enableAnimation, animateOnChange );

	return (
		<animated.li ref={ wrapper } style={ style } role="treeitem">
			<div
				className={ classnames( 'block-editor-block-navigation__item', {
					'is-selected': isSelected,
				} ) }
				onMouseEnter={ () => setIsHovered( true ) }
				onMouseLeave={ () => setIsHovered( false ) }
			>
				<Button
					className="block-editor-block-navigation__item-button"
					onClick={ () => selectBlock( clientId ) }
					onFocus={ () => setIsSelectionButtonFocused( true ) }
					onBlur={ () => setIsSelectionButtonFocused( false ) }
				>
					<BlockIcon icon={ blockType.icon } showColors />
					{ blockDisplayName }
					{ isSelected && <span className="screen-reader-text">{ __( '(selected block)' ) }</span> }
				</Button>
				{ showBlockMovers && hasSiblings && (
					<BlockMover
						isHidden={ ! isHovered && ! isSelected && ! isSelectionButtonFocused }
						clientIds={ [ clientId ] }
					/>
				) }
			</div>
			{ showNestedBlocks && !! innerBlocks && !! innerBlocks.length && (
				<NavigationList
					blocks={ innerBlocks }
					selectedBlockClientId={ selectedBlockClientId }
					selectBlock={ selectBlock }
					showAppender={ showAppender }
					showBlockMovers={ showBlockMovers }
					showNestedBlocks={ showNestedBlocks }
					parentBlockClientId={ clientId }
				/>
			) }
		</animated.li>
	);
}

export default function BlockNavigationList( props ) {
	const {
		blocks,
		selectedBlockClientId,
		selectBlock,
		showAppender,
		showBlockMovers,
		showNestedBlocks,
	} = props;

	return (
		<NavigationList
			blocks={ blocks }
			selectedBlockClientId={ selectedBlockClientId }
			selectBlock={ selectBlock }
			showAppender={ showAppender }
			showBlockMovers={ showBlockMovers }
			showNestedBlocks={ showNestedBlocks }
		/>
	);
}
