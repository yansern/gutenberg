/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import patterns from './patterns';

export const name = 'core/social-link';

export const settings = {
	title: __( 'Social Icon' ),
	category: 'widgets',
	parent: [ 'core/social-links' ],
	supports: {
		reusable: false,
		html: false,
	},
	edit,
	description: __( 'Link to a social media profile' ),
	attributes: {
		url: {
			type: 'string',
		},
		site: {
			type: 'string',
		},
		label: {
			type: 'string',
		},
	},
	patterns,
};
