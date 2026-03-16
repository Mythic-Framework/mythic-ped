import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TabPanel, Dialog } from '../../components/UIComponents';
import { CurrencyFormat } from '../../util/Parser';
import { SavePed, CancelEdits } from '../../actions/pedActions';
import Tattoo from '../../components/Tattoos';
import Naked from '../../components/PedComponents/Naked';
import CamBar from '../../components/UIComponents/CamBar';

const useStyles = makeStyles((theme) => ({
	panelShell: {
		position: 'absolute',
		right: 20,
		top: '4vh',
		width: 500,
		height: '92vh',
		display: 'flex',
		flexDirection: 'column',
		background: 'rgba(18,16,37,0.96)',
		border: '1px solid rgba(32,134,146,0.2)',
		boxShadow: '0 0 0 1px rgba(32,134,146,0.06), 0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(32,134,146,0.06)',
		borderRadius: 2,
		overflow: 'hidden',
		animation: '$panelSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
	},
	panelAccent: {
		height: 2,
		background: 'linear-gradient(90deg, transparent, #208692, transparent)',
		flexShrink: 0,
	},
	panelHeader: {
		padding: '12px 16px 10px',
		borderBottom: '1px solid rgba(32,134,146,0.15)',
		flexShrink: 0,
		display: 'flex',
		flexDirection: 'column',
		background: 'rgba(10,9,20,0.4)',
	},
	panelLabel: {
		fontSize: 9,
		fontWeight: 700,
		letterSpacing: '0.3em',
		textTransform: 'uppercase',
		color: 'rgba(32,134,146,0.7)',
		marginBottom: 2,
		fontFamily: "'Rajdhani', sans-serif",
	},
	panelTitle: {
		fontFamily: "'Orbitron', sans-serif",
		fontSize: 13,
		fontWeight: 700,
		color: '#ffffff',
		letterSpacing: '0.08em',
	},
	tabHeader: {
		flex: '0 0 auto',
		borderBottom: '1px solid rgba(32,134,146,0.15)',
	},
	tabs: { minHeight: 42 },
	tab: {
		minHeight: 42,
		minWidth: 0,
		flex: 1,
		padding: 0,
		opacity: 0.45,
		color: '#ffffff',
		fontSize: 15,
		transition: 'opacity 0.2s ease, color 0.2s ease',
		'&.Mui-selected': { opacity: 1, color: '#208692' },
		'& svg': { fontSize: 16 },
	},
	panelBody: {
		flex: '1 1 auto',
		overflowY: 'auto',
		padding: 12,
	},
	saveBar: {
		position: 'absolute',
		bottom: '1.5%',
		left: '1.5%',
		display: 'flex',
		gap: 8,
		padding: '8px 10px',
		borderRadius: 2,
		background: 'rgba(18,16,37,0.9)',
		border: '1px solid rgba(32,134,146,0.15)',
		backdropFilter: 'blur(8px)',
	},
	btn: {
		minWidth: 110,
		height: 34,
		padding: '0 14px',
		borderRadius: 2,
		textTransform: 'uppercase',
		fontSize: 11,
		fontWeight: 700,
		fontFamily: "'Rajdhani', sans-serif",
		letterSpacing: '0.15em',
		color: '#ffffff',
		background: 'rgba(32,134,146,0.12)',
		border: '1px solid rgba(32,134,146,0.35)',
		boxShadow: 'none',
		transition: 'all 150ms ease',
		'&:hover': {
			background: 'rgba(32,134,146,0.22)',
			borderColor: '#208692',
			boxShadow: '0 0 12px rgba(32,134,146,0.3)',
			transform: 'translateY(-1px)',
		},
		'&:active': { transform: 'translateY(0)' },
		'& .MuiButton-startIcon': { marginRight: 6 },
		'& .MuiButton-startIcon svg': { fontSize: 11 },
	},
	btnPrimary: {
		background: 'rgba(82,152,74,0.15)',
		borderColor: 'rgba(82,152,74,0.4)',
		color: '#60eb50',
		'&:hover': {
			background: 'rgba(82,152,74,0.28)',
			borderColor: '#52984a',
			boxShadow: '0 0 12px rgba(82,152,74,0.25)',
		},
	},
	btnDanger: {
		background: 'rgba(110,22,22,0.15)',
		borderColor: 'rgba(161,52,52,0.4)',
		color: '#a13434',
		'&:hover': {
			background: 'rgba(110,22,22,0.28)',
			borderColor: '#a13434',
			boxShadow: '0 0 12px rgba(110,22,22,0.25)',
		},
	},
	'@keyframes panelSlide': {
		'0%': { opacity: 0, transform: 'translateX(40px)' },
		'100%': { opacity: 1, transform: 'translateX(0)' },
	},
}));

export default (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.app.state);
	const cost = useSelector((state) => state.app.pricing.TATTOO);
	const admin = useSelector((state) => state.app.admin || false);

	const [cancelling, setCancelling] = useState(false);
	const [saving, setSaving] = useState(false);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => setValue(newValue);

	const onCancel = () => {
		setCancelling(false);
		dispatch(CancelEdits());
	};

	const onSave = () => {
		setSaving(false);
		dispatch(SavePed(state));
	};

	const payLabel = admin
		? 'Save Everything'
		: `Pay ${CurrencyFormat.format(cost || 0)}`;

	return (
		<div>
			<CamBar />
			<div className={classes.panelShell}>
				<div className={classes.panelAccent} />
				<div className={classes.panelHeader}>
					<span className={classes.panelLabel}>Tattoo Parlor</span>
					<span className={classes.panelTitle}>Ink Studio</span>
				</div>
				<div className={classes.tabHeader}>
					<Tabs
						orientation="horizontal"
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						className={classes.tabs}
					>
						<Tab className={classes.tab} label={<FontAwesomeIcon icon={['fas', 'atom']} />} />
					</Tabs>
				</div>
				<div className={classes.panelBody}>
					<TabPanel value={value} index={0}><Tattoo /></TabPanel>
				</div>
			</div>

			<Naked />
			<div className={classes.saveBar}>
				<Button
					className={`${classes.btn} ${classes.btnDanger}`}
					onClick={() => setCancelling(true)}
					startIcon={<FontAwesomeIcon icon={['fas', 'chair']} />}
				>
					Leave Tattoo Chair
				</Button>
				<Button
					className={`${classes.btn} ${classes.btnPrimary}`}
					onClick={() => setSaving(true)}
					startIcon={<FontAwesomeIcon icon={['fas', 'save']} />}
				>
					{payLabel}
				</Button>
			</div>

			<Dialog
				title="Disregard Tattoo Selection?"
				open={cancelling}
				onAccept={onCancel}
				onDecline={() => setCancelling(false)}
				acceptLang="Yeah, I Don't Want to Change"
				declineLang="Wait, Let Me Finish"
			>
				<p>All changes will be discarded, are you sure you want to continue?</p>
			</Dialog>
			<Dialog
				title="Confirm Tattoo Selection?"
				open={saving}
				onAccept={onSave}
				onDecline={() => setSaving(false)}
				acceptLang="Ink Me Up"
				declineLang="Wait, Let Me Finish"
			>
				{admin ? (
					<p>Your tattoos are free — the artist said bulk ink hides the shaky lines.</p>
				) : (
					<p>You will be charged <span style={{ color: '#208692', fontWeight: 700 }}>{CurrencyFormat.format(cost || 0)}</span> for these tattoos.</p>
				)}
				<p>Are you sure you want to save?</p>
			</Dialog>
		</div>
	);
};
