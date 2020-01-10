/**
 * External dependencies
 */
import { get, omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { LinearGradientIcon, RadialGradientIcon } from './icons';
import CustomGradientBar from './custom-gradient-bar';
import BaseControl from '../base-control';
import { getGradientParsed } from './utils';
import { serializeGradient } from './serializer';
import ToolbarGroup from '../toolbar-group';
import {
	DEFAULT_LINEAR_GRADIENT_ANGLE,
	HORIZONTAL_GRADIENT_ORIENTATION,
} from './constants';

const AnglePicker = withInstanceId(
	( { value, onChange, instanceId } ) => {
		const inputId = `components-custom-gradient-picker__angle-picker-${ instanceId }`;
		return (
			<BaseControl
				label={ __( 'Angle' ) }
				id={ inputId }
				className="components-custom-gradient-picker__angle-picker"
			>
				<input
					className="components-custom-gradient-picker__angle-picker-field"
					type="number"
					id={ inputId }
					onChange={ ( event ) => {
						const unprocessedValue = event.target.value;
						const inputValue = unprocessedValue !== '' ?
							parseInt( event.target.value, 10 ) :
							0;
						onChange( inputValue );
					} }
					value={ value }
					min={ 0 }
					max={ 360 }
					step="1"
				/>
			</BaseControl>
		);
	}
);

const GradientAnglePicker = ( { gradientAST, hasGradient, onChange } ) => {
	const angle = get( gradientAST, [ 'orientation', 'value' ], DEFAULT_LINEAR_GRADIENT_ANGLE );
	const onAngleChange = ( newAngle ) => {
		onChange( serializeGradient( {
			...gradientAST,
			orientation: {
				type: 'angular',
				value: newAngle,
			},
		} ) );
	};
	return (
		<AnglePicker
			value={ hasGradient ? angle : '' }
			onChange={ onAngleChange }
		/>
	);
};

const GradientTypePicker = ( { gradientAST, hasGradient, onChange } ) => {
	const { type } = gradientAST;
	const onSetLinearGradient = () => {
		onChange( serializeGradient( {
			...gradientAST,
			...( gradientAST.orientation ?
				{} :
				{ orientation: HORIZONTAL_GRADIENT_ORIENTATION }
			),
			type: 'linear-gradient',
		} ) );
	};

	const onSetRadialGradient = () => {
		onChange( serializeGradient( {
			...omit( gradientAST, [ 'orientation' ] ),
			type: 'radial-gradient',
		} ) );
	};

	return (
		<BaseControl className="components-custom-gradient-picker__type-picker">
			<BaseControl.VisualLabel>
				{ __( 'Type' ) }
			</BaseControl.VisualLabel>
			<ToolbarGroup
				controls={ [
					{
						icon: <LinearGradientIcon />,
						title: 'Linear Gradient',
						isActive: hasGradient && type === 'linear-gradient',
						onClick: onSetLinearGradient,
					},
					{
						icon: <RadialGradientIcon />,
						title: 'Radial Gradient',
						isActive: hasGradient && type === 'radial-gradient',
						onClick: onSetRadialGradient,
					},
				] }
			/>
		</BaseControl>
	);
};

export default function CustomGradientPicker( { value, onChange } ) {
	const { gradientAST, hasGradient } = getGradientParsed( value );
	const { type } = gradientAST;
	return (
		<div className="components-custom-gradient-picker">
			<CustomGradientBar
				value={ value }
				onChange={ onChange }
			/>
			<div className="components-custom-gradient-picker__ui-line">
				<GradientTypePicker
					gradientAST={ gradientAST }
					hasGradient={ hasGradient }
					onChange={ onChange }
				/>
				{ type === 'linear-gradient' && (
					<GradientAnglePicker
						gradientAST={ gradientAST }
						hasGradient={ hasGradient }
						onChange={ onChange }
					/>
				) }
			</div>
		</div>
	);
}
