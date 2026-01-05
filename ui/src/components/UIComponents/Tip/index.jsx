import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'absolute',
		bottom: 12,
		left: '50%',
		transform: 'translateX(-50%)',

		display: 'flex',
		alignItems: 'center',

		padding: 10,
		gap: 20,

		background: theme.palette.secondary.dark + '99',
		borderRadius: 10,
		border: `1px solid ${theme.palette.border.divider}`,

		userSelect: 'none',
	},

	row: {
		display: 'flex',
		alignItems: 'center',
		gap: 6,
		fontSize: 13,
		textTransform: 'uppercase',
		letterSpacing: 0.8,
		color: theme.palette.text.main,
		whiteSpace: 'nowrap',
	},

	key: {
		color: theme.palette.primary.main,
		fontWeight: 600,
	},
}));

export default () => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<div className={classes.row}>
				<span className={classes.key}>Q</span>
				<span>/</span>
				<span className={classes.key}>E</span>
				<span>: Rotate</span>
			</div>
			<div className={classes.row}>
				<span className={classes.key}>Mousewheel</span>
				<span>: Zoom</span>
			</div>
			<div className={classes.row}>
				<span className={classes.key}>R</span>
				<span>: Animation</span>
			</div>
		</div>
	);
};
