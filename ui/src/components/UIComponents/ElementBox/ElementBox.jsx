import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	inner: {
		paddingBottom: 12,
		overflow: 'hidden',
	},
	header: {
		position: 'relative',
		display: 'inline-flex',
		alignItems: 'center',
		gap: 8,
		marginBottom: 14,
		paddingBottom: 8,
		borderBottom: '1px solid rgba(32,134,146,0.2)',
		width: '100%',
	},
	headerDot: {
		width: 4,
		height: 4,
		borderRadius: '50%',
		background: '#208692',
		boxShadow: '0 0 6px rgba(32,134,146,0.8)',
		flexShrink: 0,
	},
	headerText: {
		fontFamily: "'Rajdhani', sans-serif",
		fontSize: 10,
		fontWeight: 700,
		letterSpacing: '0.25em',
		textTransform: 'uppercase',
		color: 'rgba(255,255,255,0.9)',
		userSelect: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	headerLine: {
		flex: 1,
		height: 1,
		background: 'linear-gradient(90deg, rgba(32,134,146,0.2), transparent)',
		marginLeft: 4,
	},
}));

export default (props) => {
	const classes = useStyles();
	return (
		<div className={classes.inner}>
			{Boolean(props.label) && (
				<div className={classes.header}>
					<div className={classes.headerDot} />
					<span className={classes.headerText}>{props.label}</span>
					<div className={classes.headerLine} />
				</div>
			)}
			<div className={props.bodyClass}>{props.children}</div>
		</div>
	);
};
