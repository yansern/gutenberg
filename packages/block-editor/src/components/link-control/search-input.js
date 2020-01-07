
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { LEFT,
	RIGHT,
	UP,
	DOWN,
	BACKSPACE,
	ENTER,
} from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import { URLInput } from '../';

const handleLinkControlOnKeyDown = ( event ) => {
	const { keyCode } = event;

	if ( [ LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER ].indexOf( keyCode ) > -1 ) {
		// Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
		event.stopPropagation();
	}
};

const handleLinkControlOnKeyPress = ( event ) => {
	event.stopPropagation();
};

const LinkControlSearchInput = ( {
	value,
	onChange,
	onSelect,
	renderSuggestions,
	fetchSuggestions,
	onReset,
} ) => {
	const selectItemHandler = ( selection, suggestion ) => {
		onChange( selection );

		if ( suggestion ) {
			onSelect( suggestion );
		}
	};

	const stopFormEventsPropagation = ( event ) => {
		event.preventDefault();
		event.stopPropagation();

		selectItemHandler( value, {
			url: value,
		} );
	};

	return (
		<form onSubmit={ stopFormEventsPropagation }>
			<URLInput
				className="block-editor-link-control__search-input"
				value={ value }
				onChange={ selectItemHandler }
				onKeyDown={ ( event ) => {
					if ( event.keyCode === ENTER ) {
						return;
					}
					handleLinkControlOnKeyDown( event );
				} }
				onKeyPress={ handleLinkControlOnKeyPress }
				placeholder={ __( 'Search or type url' ) }
				__experimentalRenderSuggestions={ renderSuggestions }
				__experimentalFetchLinkSuggestions={ fetchSuggestions }
				__experimentalHandleURLSuggestions={ true }
			/>

			<div className="block-editor-link-control__search-actions">
				<Button
					disabled={ ! value.length }
					type="submit"
					label={ __( 'Submit' ) }
					icon="editor-break"
					className="block-editor-link-control__search-submit"
					onClick={ () => {
						selectItemHandler( value, {
							url: value,
						} );
					} }
				/>

				<Button
					disabled={ ! value.length }
					type="reset"
					label={ __( 'Reset' ) }
					icon="no-alt"
					className="block-editor-link-control__search-reset"
					onClick={ onReset }
				/>
			</div>

		</form>
	);
};

export default LinkControlSearchInput;
