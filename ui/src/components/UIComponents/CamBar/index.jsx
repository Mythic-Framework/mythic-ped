import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Nui from '../../../util/Nui';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'absolute',
		left: 12,
		top: '50%',
		transform: 'translateY(-50%)',
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		padding: 8,
		background: theme.palette.secondary.dark + '99',
		borderRadius: 10,
		border: `1px solid ${theme.palette.border.divider}`,
		zIndex: 15,
	},

	button: {
		width: 44,
		height: 44,
		color: theme.palette.text.alt,
		background: theme.palette.secondary.main + '55',
		transition: 'background 0.15s ease-in-out, color 0.15s ease-in-out',

		'&:hover': {
			background: theme.palette.secondary.main + '88',
		},

		'&.active': {
			color: theme.palette.primary.main,
			background: theme.palette.primary.main + '22',
		},
	},
}));

export default function CamBar() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const camera = useSelector((state) => state.app.camera);

	const setCam = async (cam) => {
		try {
			const res = await (await Nui.send('ChangeCamera', cam)).json();
			if (res) {
				dispatch({
					type: 'SET_CAM',
					payload: { cam },
				});
			}
		} catch (err) {}
	};

	const cams = [
		{ icon: ['fas', 'person'], id: 0 },
		{ icon: ['fas', 'face-smile'], id: 1 },
		{ icon: ['fas', 'shirt'], id: 2 },
		{ icon: ['fas', 'shoe-prints'], id: 3 },
	];

	return (
		<div className={classes.wrapper}>
			{cams.map((c) => (
				<IconButton
					key={c.id}
					className={`${classes.button} ${
						camera === c.id ? 'active' : ''
					}`}
					onClick={() => setCam(c.id)}
				>
					<FontAwesomeIcon icon={c.icon} />
				</IconButton>
			))}
		</div>
	);
}
