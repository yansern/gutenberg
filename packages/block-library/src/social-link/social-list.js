/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import patterns from './patterns';

/**
 * Retrieves the social service's icon component.
 *
 * @param {string} name key for a social service (lowercase slug)
 *
 * @return {WPComponent} Icon component for social service.
 */
export const getIconBySite = ( name ) => {
	return find( patterns, { name } ).icon;
};

/**
 * Retrieves the display name for the social service.
 *
 * @param {string} name key for a social service (lowercase slug)
 *
 * @return {string} Display name for social service
 */
export const getNameBySite = ( name ) => {
	return find( patterns, { name } ).title;
};
