/**
 * External dependencies
 */
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
import RovingTabIndex from '../roving-tab-index';
import BlockIcon from '../block-icon';
import { MoveUpButton, MoveDownButton } from '../block-mover/mover-buttons';
import useMovingAnimation from '../use-moving-animation';
import ButtonBlockAppender from '../button-block-appender';

export default function BlockNavigationItem( { block, onClick, isSelected, position, hasSiblings, showBlockMovers, children } ) {
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
				className={ classnames( 'block-editor-block-navigation-item__block', {
					'is-selected': isSelected,
				} ) }
				onMouseEnter={ () => setIsHovered( true ) }
				onMouseLeave={ () => setIsHovered( false ) }
				onFocus={ () => setIsFocused( true ) }
				onBlur={ () => setIsFocused( false ) }
			>
				<RovingTabIndex.Item>
					<Button
						className="block-editor-block-navigation-item__button"
						onClick={ onClick }
					>
						<BlockIcon icon={ blockType.icon } showColors />
						{ blockDisplayName }
						{ isSelected && <span className="screen-reader-text">{ __( '(selected block)' ) }</span> }
					</Button>
				</RovingTabIndex.Item>
				{ showBlockMovers && hasSiblings && (
					<div className={ classnames( 'block-editor-block-navigation-item__movers', { 'is-visible': hasVisibleMovers } ) }>
						<RovingTabIndex.Item>
							<MoveUpButton
								__experimentalOrientation="vertical"
								clientIds={ [ clientId ] }
							/>
						</RovingTabIndex.Item>
						<RovingTabIndex.Item>
							<MoveDownButton
								__experimentalOrientation="vertical"
								clientIds={ [ clientId ] }
							/>
						</RovingTabIndex.Item>
					</div>
				) }
			</div>
			{ children }
		</animated.li>
	);
}

BlockNavigationItem.Appender = ( { parentBlockClientId } ) => (
	<li role="treeitem">
		<div className="editor-block-navigation__item block-editor-block-navigation-item__appender">
			<RovingTabIndex.Item>
				<ButtonBlockAppender
					rootClientId={ parentBlockClientId }
					__experimentalSelectBlockOnInsert={ false }
				/>
			</RovingTabIndex.Item>
		</div>
	</li>
);
