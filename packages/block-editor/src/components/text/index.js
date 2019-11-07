/**
 * Internal dependencies
 */
import RichText from '../rich-text';

function Text( props ) {
	return (
		<RichText { ...props } __unstableDisableFormats />
	);
}

Text.Content = ( {
	value = '',
	tagName: Tag = 'div',
	...props
} ) => {
	return <Tag { ...props }>{ value }</Tag>;
};

export default Text;
