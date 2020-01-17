
/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { focus } from '@wordpress/dom';
import { useRef, useState, Children, cloneElement } from '@wordpress/element';
import { UP, DOWN, LEFT, RIGHT } from '@wordpress/keycodes';

/**
 * Return focusables in a row element, excluding those from other branches
 * nested within the row.
 *
 * @param {Element} rowElement The DOM element representing the row.
 *
 * @return {?Array} The array of focusables in the row.
 */
function getRowFocusables( rowElement ) {
	const focusablesInRow = focus.focusable.find( rowElement );

	if ( ! focusablesInRow || ! focusablesInRow.length ) {
		return;
	}

	return focusablesInRow.filter( ( focusable ) => {
		return focusable.closest( '[role="treeitem"]' ) === rowElement;
	} );
}

function emitToChild( child, eventName, event ) {
	if ( typeof child.props[ eventName ] === 'function' ) {
		child.props[ eventName ]( event );
	}
}

export function NavigableTreeGridItem( { children } ) {
	const [ isFocused, setIsFocused ] = useState( false );

	// Ensure a single child.
	Children.only( children );

	return Children.map( children, ( child ) => {
		return cloneElement( child, {
			tabIndex: isFocused ? 1 : -1,
			onFocus( event ) {
				emitToChild( child, 'onFocus', event );
				setIsFocused( true );
			},
			onBlur( event ) {
				emitToChild( child, 'onBlur', event );
				setIsFocused( false );
			},
		} );
	} );
}

export function NavigableTreeGrid( { children } ) {
	const containerRef = useRef();

	const onKeyDown = ( event ) => {
		const { keyCode } = event;

		if ( ! includes( [ UP, DOWN, LEFT, RIGHT ], keyCode ) ) {
			return;
		}

		event.stopPropagation();

		const { activeElement } = document;
		if ( ! containerRef.current.contains( activeElement ) ) {
			return;
		}

		// Calculate the columnIndex of the active element.
		const activeRow = activeElement.closest( '[role="treeitem"]' );
		const focusablesInRow = getRowFocusables( activeRow );
		const currentColumnIndex = focusablesInRow.indexOf( activeElement );

		if ( includes( [ LEFT, RIGHT ], keyCode ) ) {
			// Cycle to the next element and focus it.
			let nextIndex;
			if ( keyCode === LEFT ) {
				nextIndex = ( currentColumnIndex - 1 ) < 0 ? focusablesInRow.length - 1 : currentColumnIndex - 1;
			} else {
				nextIndex = ( currentColumnIndex + 1 ) >= focusablesInRow.length ? 0 : currentColumnIndex + 1;
			}

			focusablesInRow[ nextIndex ].focus();
		} else if ( includes( [ UP, DOWN ], keyCode ) ) {
			// Calculate the rowIndex of the next row.
			const rows = Array.from( containerRef.current.querySelectorAll( '[role="treeitem"]' ) );
			const currentRowIndex = rows.indexOf( activeRow );
			let nextRowIndex;

			if ( keyCode === UP ) {
				nextRowIndex = Math.max( 0, currentRowIndex - 1 );
			} else {
				nextRowIndex = Math.min( currentRowIndex + 1, rows.length - 1 );
			}

			// Navigation is either at the top or bottom of the grid. Do nothing.
			if ( nextRowIndex === currentRowIndex ) {
				return;
			}

			// Get the focusables in the next row.
			const focusablesInNextRow = getRowFocusables( rows[ nextRowIndex ] );

			// If for some reason there are no focusables in the next row, do nothing.
			if ( ! focusablesInNextRow || ! focusablesInNextRow.length ) {
				return;
			}

			// Try to focus the element in the next row that's at a similar column to the activeElement.
			const nextIndex = Math.min( currentColumnIndex, focusablesInNextRow.length - 1 );
			focusablesInNextRow[ nextIndex ].focus();
		}
	};

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div onKeyDown={ onKeyDown } ref={ containerRef }>
			{ children }
		</div>
	);
}
