/**
 * External dependencies
 */
import { animated } from 'react-spring/web.cjs';
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
import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NavigableTreeGrid from '../navigable-tree-grid';
import RovingTabIndexItem from '../roving-tab-index/item';
import BlockIcon from '../block-icon';
import ButtonBlockAppender from '../button-block-appender';
import { MoveUpButton, MoveDownButton } from '../block-mover/mover-buttons';
import useMovingAnimation from '../use-moving-animation';

function NavigationBlock( { block, onClick, isSelected, position, hasSiblings, showBlockMovers, children } ) {
	const [ isHovered, setIsHovered ] = useState( false );
	const [ isFocused, setIsFocused ] = useState( false );
	const {
		name,
		clientId,
		attributes,
	} = block;
	const blockType = getBlockType( name );
	const blockDisplayName = getBlockLabel( blockType, attributes );

	const wrapper = useRef( null );
	const adjustScrolling = false;
	const enableAnimation = true;
	const animateOnChange = position;

	const style = useMovingAnimation( wrapper, isSelected, adjustScrolling, enableAnimation, animateOnChange );

	const hasVisibleMovers = isHovered || isSelected || isFocused;

	return (
		<animated.li ref={ wrapper } style={ style } role="treeitem">
			<div
				className={ classnames( 'block-editor-block-navigation__item', {
					'is-selected': isSelected,
				} ) }
				onMouseEnter={ () => setIsHovered( true ) }
				onMouseLeave={ () => setIsHovered( false ) }
				onFocus={ () => setIsFocused( true ) }
				onBlur={ () => setIsFocused( false ) }
			>
				<RovingTabIndexItem>
					<Button
						className="block-editor-block-navigation__item-button"
						onClick={ onClick }
					>
						<BlockIcon icon={ blockType.icon } showColors />
						{ blockDisplayName }
						{ isSelected && <span className="screen-reader-text">{ __( '(selected block)' ) }</span> }
					</Button>
				</RovingTabIndexItem>
				{ showBlockMovers && hasSiblings && (
					<div className={ classnames( 'block-editor-block-navigation__item-movers', { 'is-visible': hasVisibleMovers } ) }>
						<RovingTabIndexItem>
							<MoveUpButton
								clientIds={ [ clientId ] }
							/>
						</RovingTabIndexItem>
						<RovingTabIndexItem>
							<MoveDownButton
								clientIds={ [ clientId ] }
							/>
						</RovingTabIndexItem>
					</div>
				) }
			</div>
			{ children }
		</animated.li>
	);
}

function NavigationList( props ) {
	const {
		blocks,
		selectBlock,
		selectedBlockClientId,
		showAppender,
		showBlockMovers,
		showNestedBlocks,
		parentBlockClientId,
	} = props;

	const isTreeRoot = ! parentBlockClientId;
	const hasAppender = showAppender && blocks.length > 0 && ! isTreeRoot;

	return (
		<ul className="editor-block-navigation__list block-editor-block-navigation__list" role={ isTreeRoot ? 'tree' : 'group' }>
			{ map( omitBy( blocks, isNil ), ( block, index ) => {
				const { clientId, innerBlocks } = block;
				const hasNestedBlocks = showNestedBlocks && !! innerBlocks && !! innerBlocks.length;

				return (
					<NavigationBlock
						key={ clientId }
						block={ block }
						onClick={ () => selectBlock( clientId ) }
						isSelected={ selectedBlockClientId === clientId }
						position={ index }
						hasSiblings={ blocks.length > 1 }
						showBlockMovers={ showBlockMovers }
					>
						{ hasNestedBlocks && (
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
					</NavigationBlock>
				);
			} ) }
			{ hasAppender && (
				<li role="treeitem">
					<div className="editor-block-navigation__item block-editor-block-navigation__item is-appender">
						<RovingTabIndexItem>
							<ButtonBlockAppender
								rootClientId={ parentBlockClientId }
								__experimentalSelectBlockOnInsert={ false }
							/>
						</RovingTabIndexItem>
					</div>
				</li>
			) }
		</ul>
	);
}

export default function BlockNavigationList( props ) {
	return (
		<NavigableTreeGrid>
			<NavigationList { ...props } />
		</NavigableTreeGrid>
	);
}
