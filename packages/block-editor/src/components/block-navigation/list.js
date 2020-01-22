/**
 * External dependencies
 */
import { isNil, map, omitBy } from 'lodash';

/**
 * Internal dependencies
 */
import NavigableTreeGrid from '../navigable-tree-grid';
import RovingTabIndex from '../roving-tab-index';
import BlockNavigationItem from './item';

function BlockNavigationList( props ) {
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
					<BlockNavigationItem
						key={ clientId }
						block={ block }
						onClick={ () => selectBlock( clientId ) }
						isSelected={ selectedBlockClientId === clientId }
						position={ index }
						hasSiblings={ blocks.length > 1 }
						showBlockMovers={ showBlockMovers }
					>
						{ hasNestedBlocks && (
							<BlockNavigationList
								blocks={ innerBlocks }
								selectedBlockClientId={ selectedBlockClientId }
								selectBlock={ selectBlock }
								showAppender={ showAppender }
								showBlockMovers={ showBlockMovers }
								showNestedBlocks={ showNestedBlocks }
								parentBlockClientId={ clientId }
							/>
						) }
					</BlockNavigationItem>
				);
			} ) }
			{ hasAppender && <BlockNavigationItem.Appender parentBlockClientId={ parentBlockClientId } /> }
		</ul>
	);
}

/**
 * Wrap `BlockNavigationList` with `NavigableTreeGrid` and
 * `RovingTabIndex.Container`. BlockNavigationList is a recursive component
 * (it renders itself), so this ensures NavigableTreeGrid is only present at
 * the very top of the navigation list.
 *
 * @param {Object} props
 */
export default function BlockNavigationListWithTreeGrid( props ) {
	return (
		<NavigableTreeGrid>
			<RovingTabIndex.Container>
				<BlockNavigationList { ...props } />
			</RovingTabIndex.Container>
		</NavigableTreeGrid>
	);
}
