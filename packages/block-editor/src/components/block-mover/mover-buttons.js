/**
 * External dependencies
 */
import { castArray, first, last, partial } from 'lodash';

/**
 * WordPress dependencies
 */
import { getBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { leftArrow, rightArrow, upArrow, downArrow } from './icons';
import { getBlockMoverDescription } from './mover-description';

const getArrowIcon = ( direction, orientation, isRTL ) => {
	if ( direction === 'up' ) {
		if ( orientation === 'horizontal' ) {
			return isRTL ? rightArrow : leftArrow;
		}
		return upArrow;
	} else if ( direction === 'down' ) {
		if ( orientation === 'horizontal' ) {
			return isRTL ? leftArrow : rightArrow;
		}
		return downArrow;
	}
	return null;
};

const getMovementDirection = ( direction, orientation, isRTL ) => {
	if ( direction === 'up' ) {
		if ( orientation === 'horizontal' ) {
			return isRTL ? 'right' : 'left';
		}
		return 'up';
	} else if ( direction === 'down' ) {
		if ( orientation === 'horizontal' ) {
			return isRTL ? 'left' : 'right';
		}
		return 'down';
	}
	return null;
};

function BlockMoverButton( { clientIds, direction, ...props } ) {
	const instanceId = useInstanceId( BlockMoverButton );
	const blocksCount = castArray( clientIds ).length;

	const {
		blockType,
		isDisabled,
		rootClientId,
		isFirst,
		isLast,
		firstIndex,
		isRTL,
		orientation,
	} = useSelect( ( select ) => {
		const { getBlockIndex, getBlockRootClientId, getBlockOrder, getBlock, getSettings, getBlockListSettings } = select( 'core/block-editor' );
		const normalizedClientIds = castArray( clientIds );
		const firstClientId = first( normalizedClientIds );
		const blockRootClientId = getBlockRootClientId( firstClientId );
		const firstBlockIndex = getBlockIndex( firstClientId, blockRootClientId );
		const lastBlockIndex = getBlockIndex( last( normalizedClientIds ), blockRootClientId );
		const blockOrder = getBlockOrder( blockRootClientId );
		const block = getBlock( firstClientId );
		const isFirstBlock = firstBlockIndex === 0;
		const isLastBlock = lastBlockIndex === blockOrder.length - 1;
		const { __experimentalMoverDirection = 'vertical' } = getBlockListSettings( blockRootClientId ) || {};

		return {
			blockType: block ? getBlockType( block.name ) : null,
			isDisabled: direction === 'up' ? isFirstBlock : isLastBlock,
			rootClientId: blockRootClientId,
			firstIndex: firstBlockIndex,
			isFirst: isFirstBlock,
			isLast: isLastBlock,
			isRTL: getSettings().isRTL,
			orientation: __experimentalMoverDirection,
		};
	}, [ clientIds, direction ] );

	const { moveBlocksDown, moveBlocksUp } = useDispatch( 'core/block-editor' );
	const moverFunction = direction === 'up' ? moveBlocksUp : moveBlocksDown;
	const onClick = partial( moverFunction, clientIds, rootClientId );
	const descriptionId = `block-editor-block-mover-button__description-${ instanceId }`;

	return (
		<>
			<Button
				className="block-editor-block-mover-button"
				icon={ getArrowIcon( direction, orientation, isRTL ) }
				// translators: %s: Horizontal direction of block movement ( left, right )
				label={ sprintf( __( 'Move %s' ), getMovementDirection( direction, orientation, isRTL ) ) }
				aria-describedby={ descriptionId }
				onClick={ onClick }
				aria-disabled={ isDisabled }
				{ ...props }
			/>
			<span id={ descriptionId } className="block-editor-block-mover-button__description">
				{
					getBlockMoverDescription(
						blocksCount,
						blockType && blockType.title,
						firstIndex,
						isFirst,
						isLast,
						direction === 'up' ? -1 : 1,
						orientation,
						isRTL,
					)
				}
			</span>
		</>
	);
}

export function MoveUpButton( props ) {
	return (
		<BlockMoverButton direction="up" { ...props } />
	);
}

export function MoveDownButton( props ) {
	return (
		<BlockMoverButton direction="down" { ...props } />
	);
}
