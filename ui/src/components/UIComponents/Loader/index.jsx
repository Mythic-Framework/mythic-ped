import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		position: 'fixed',
		inset: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'rgba(10,9,20,0.92)',
		zIndex: 9999,
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 20,
		padding: '32px 48px',
		background: 'rgba(18,16,37,0.98)',
		border: '1px solid rgba(32,134,146,0.25)',
		borderRadius: 2,
		boxShadow: '0 0 0 1px rgba(32,134,146,0.08), 0 24px 60px rgba(0,0,0,0.8)',
	},
	spinnerOuter: {
		width: 48,
		height: 48,
		border: '2px solid rgba(32,134,146,0.15)',
		borderTop: '2px solid #208692',
		borderRadius: '50%',
		animation: '$spin 0.8s linear infinite',
	},
	spinnerInner: {
		position: 'absolute',
		width: 32,
		height: 32,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		border: '2px solid rgba(32,134,146,0.08)',
		borderBottom: '2px solid rgba(77,184,196,0.6)',
		borderRadius: '50%',
		animation: '$spinReverse 1.2s linear infinite',
	},
	spinnerWrap: {
		position: 'relative',
		width: 48,
		height: 48,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: '50%',
		background: '#208692',
		boxShadow: '0 0 8px rgba(32,134,146,0.8)',
	},
	label: {
		fontFamily: "'Orbitron', sans-serif",
		fontSize: 11,
		fontWeight: 600,
		letterSpacing: '0.25em',
		textTransform: 'uppercase',
		color: 'rgba(32,134,146,0.7)',
		animation: '$pulse 2s ease-in-out infinite',
	},
	'@keyframes spin': {
		'0%': { transform: 'rotate(0deg)' },
		'100%': { transform: 'rotate(360deg)' },
	},
	'@keyframes spinReverse': {
		'0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
		'100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
	},
	'@keyframes pulse': {
		'0%, 100%': { opacity: 1 },
		'50%': { opacity: 0.4 },
	},
}));

export default () => {
	const classes = useStyles();

	return (
		<div className={classes.backdrop}>
			<div className={classes.card}>
				<div className={classes.spinnerWrap}>
					<div className={classes.spinnerOuter} />
					<div className={classes.spinnerInner} />
					<div className={classes.dot} />
				</div>
				<span className={classes.label}>Loading...</span>
			</div>
		</div>
	);
};
