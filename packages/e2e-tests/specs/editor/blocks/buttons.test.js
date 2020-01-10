/**
 * WordPress dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	pressKeyWithModifier,
} from '@wordpress/e2e-test-utils';

describe( 'Buttons', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'has focus on button content', async () => {
		await insertBlock( 'Buttons' );
		await page.keyboard.type( 'Content' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'can jump to the link editor using the keyboard shortcut', async () => {
		await insertBlock( 'Buttons' );
		await page.keyboard.type( 'WordPress' );
		await pressKeyWithModifier( 'primary', 'k' );

		// A similar hack is used in the links test to wait for the input to be ready.
		await page.waitForSelector( '.block-editor-link-control__popover-inner' );
		await page.waitForFunction( () => !! document.activeElement.closest( '.block-editor-url-input' ) );

		await page.keyboard.type( 'https://www.wordpress.org/' );
		await page.keyboard.press( 'Enter' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
