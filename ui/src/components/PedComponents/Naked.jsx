import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Nui from '../../util/Nui';
import PedModels from './Ped/peds';

const useStyles = makeStyles((theme) => ({
	badge: {
		position: 'absolute',
		top: 10,
		left: 10,

		display: 'inline-flex',
		alignItems: 'center',
		gap: 8,

		padding: '6px 10px',
		borderRadius: 8,
		background: theme.palette.secondary.dark + 'CC',
		border: `1px solid ${theme.palette.border.divider}`,

		color: theme.palette.text.main,
		fontSize: 13,
		lineHeight: '16px',
		userSelect: 'none',
	},
	checkbox: {
		padding: 0,
		margin: 0,

		color: theme.palette.primary.main,
		'&.Mui-checked': {
			color: theme.palette.primary.main,
		},
		'&.Mui-disabled': {
			color: theme.palette.text.info,
		},
	},
}));

export default () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const isNekked = useSelector((state) => state.app.isNekked);
	const isForced = useSelector((state) => state.app.forcedNekked);
	const gender = useSelector((state) => state.app.gender);
	const model = useSelector((state) => state.app.ped.model);

	const peds = PedModels[gender];
	const curr = peds.indexOf(model) === -1 ? 0 : peds.indexOf(model);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			await (await Nui.send('ToggleNekked', isNekked || isForced)).json();
			setTimeout(() => setLoading(false), 600);
		})();
	}, [isNekked, isForced]);

	const disabled = isForced || loading || curr !== 0;

	const onChange = () => {
		if (disabled) return;

		try {
			Nui.send('FrontEndSound', { sound: 'SELECT' });
			dispatch({
				type: 'SET_NEKKED',
				payload: { state: !isNekked },
			});
		} catch (err) {}
	};

	const label = isForced
		? 'Forced by Model'
		: isNekked
		? 'Clothing Hidden'
		: 'Clothing Visible';

	return (
		<div className={classes.badge} onClick={onChange}>
			<Checkbox
				className={classes.checkbox}
				size="small"
				checked={isNekked || isForced}
				disabled={disabled}
			/>
			<span>{label}</span>
		</div>
	);
};
