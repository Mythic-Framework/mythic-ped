import React, { useState } from 'react';
import { Grid, Slider as MSlider, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import Nui from '../../../util/Nui';

const useStyles = makeStyles((theme) => ({
	div: {
		width: '100%',
		fontSize: 12,
		fontFamily: "'Rajdhani', sans-serif",
		fontWeight: 600,
		textAlign: 'center',
		whiteSpace: 'nowrap',
		display: 'inline-block',
		verticalAlign: 'middle',
		padding: '8px 14px',
		borderRadius: 2,
		transition: '0.1s all linear',
		userSelect: 'none',
		color: '#ffffff',
		marginBottom: 4,
		background: 'rgba(18,16,37,0.5)',
		border: '1px solid rgba(32,134,146,0.12)',
	},
	label: {
		display: 'block',
		width: '100%',
		letterSpacing: '0.08em',
		textTransform: 'uppercase',
		color: 'rgba(255,255,255,0.6)',
		fontSize: 11,
		marginBottom: 4,
	},
	slider: {
		display: 'block',
		position: 'relative',
		top: '25%',
		'& .MuiSlider-thumb': {
			width: 12,
			height: 12,
			background: '#208692',
			border: '2px solid rgba(77,184,196,0.6)',
			'&:hover, &.Mui-focusVisible': {
				boxShadow: '0 0 0 6px rgba(32,134,146,0.2)',
			},
		},
		'& .MuiSlider-track': {
			background: 'linear-gradient(90deg, #0e5a62, #208692)',
			border: 'none',
		},
		'& .MuiSlider-rail': {
			background: 'rgba(32,134,146,0.2)',
		},
	},
}));

function ValueLabelComponent(props) {
	const { children, open, value } = props;
	return (
		<Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
			{children}
		</Tooltip>
	);
}

export default (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentValue, setCurrentValue] = useState(props.current);

	const onChange = (event, newValue) => {
		if (!props.disabled) {
			setCurrentValue(newValue);
			dispatch(props.event(currentValue, props.data));
		}
	};

	const cssClass = props.disabled ? `${classes.div} disabled` : classes.div;
	const style = props.disabled ? { opacity: 0.4 } : {};

	return (
		<div className={cssClass} style={style}>
			<Grid container>
				<Grid item xs={12}>
					<span className={classes.label}>{props.label}</span>
				</Grid>
				<Grid item xs={12}>
					<MSlider
						className={classes.slider}
						onChange={onChange}
						components={{ ValueLabel: ValueLabelComponent }}
						defaultValue={0}
						value={currentValue}
						disabled={props.disabled}
						step={1}
						min={props.min}
						max={props.max}
						component="div"
					/>
				</Grid>
			</Grid>
		</div>
	);
};
