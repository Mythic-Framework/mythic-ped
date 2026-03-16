import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TabPanel, Dialog } from '../../components/UIComponents';
import { Face } from '../../components';
import { CurrencyFormat } from '../../util/Parser';
import { SavePed, CancelEdits } from '../../actions/pedActions';
import Body from '../../components/Body/Body';
import Hair from '../../components/Hair/Hair';
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
	panelFooter: {
		flexShrink: 0,
		borderTop: '1px solid rgba(32,134,146,0.15)',
		background: 'rgba(10,9,20,0.4)',
		padding: '10px 12px',
		display: 'flex',
		justifyContent: 'flex-end',
		gap: 8,
	},
	btn: {
		height: 34,
		padding: '0 16px',
		borderRadius: 2,
		textTransform: 'uppercase',
		fontSize: 11,
		fontWeight: 700,
		fontFamily: "'Rajdhani', sans-serif",
		letterSpacing: '0.15em',
		border: 'none !important',
		outline: 'none !important',
		boxShadow: 'none !important',
		transition: 'background 150ms ease, transform 150ms ease',
		'&:hover': {
			border: 'none !important',
			outline: 'none !important',
			boxShadow: 'none !important',
			transform: 'translateY(-1px)',
		},
		'&:focus': { border: 'none !important', outline: 'none !important', boxShadow: 'none !important' },
		'&:active': { transform: 'translateY(0)', border: 'none !important', outline: 'none !important', boxShadow: 'none !important' },
		'& .MuiButton-startIcon': { marginRight: 6 },
		'& .MuiButton-startIcon svg': { fontSize: 11 },
	},
	btnPrimary: {
		background: 'rgba(82,152,74,0.15)',
		color: '#60eb50',
		'&:hover': { background: 'rgba(82,152,74,0.28)' },
	},
	btnDanger: {
		background: 'rgba(110,22,22,0.15)',
		color: '#a13434',
		'&:hover': { background: 'rgba(110,22,22,0.28)' },
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
	const cost = useSelector((state) => state.app.pricing.SURGERY);
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

	const payLabel = admin ? "Ready, I'm not ugly anymore!" : `Pay ${CurrencyFormat.format(cost || 0)}`;

	return (
		<div>
			<CamBar />
			<div className={classes.panelShell}>
				<div className={classes.panelAccent} />
				<div className={classes.panelHeader}>
					<span className={classes.panelLabel}>Plastic Surgeon</span>
					<span className={classes.panelTitle}>Surgical Enhancements</span>
				</div>
				<div className={classes.tabHeader}>
					<Tabs orientation="horizontal" value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" className={classes.tabs}>
						<Tab className={classes.tab} label={<FontAwesomeIcon icon={['fas', 'face-grimace']} />} />
						<Tab className={classes.tab} label={<FontAwesomeIcon icon={['fas', 'child-reaching']} />} />
						<Tab className={classes.tab} label={<FontAwesomeIcon icon={['fas', 'scissors']} />} />
					</Tabs>
				</div>
				<div className={classes.panelBody}>
					<TabPanel value={value} index={0}><Face /></TabPanel>
					<TabPanel value={value} index={1}><Body /></TabPanel>
					<TabPanel value={value} index={2}><Hair /></TabPanel>
				</div>
				<div className={classes.panelFooter}>
					<Button disableRipple disableElevation variant="text" className={`${classes.btn} ${classes.btnDanger}`} onClick={() => setCancelling(true)} startIcon={<FontAwesomeIcon icon={['fas', 'skull-crossbones']} />}>
						Abort Operation
					</Button>
					<Button disableRipple disableElevation variant="text" className={`${classes.btn} ${classes.btnPrimary}`} onClick={() => setSaving(true)} startIcon={<FontAwesomeIcon icon={['fas', 'save']} />}>
						{payLabel}
					</Button>
				</div>
			</div>

			<Naked />

			<Dialog title="Leave Surgeon's Office?" open={cancelling} onAccept={onCancel} onDecline={() => setCancelling(false)} acceptLang="I'm Already Beautiful" declineLang="Wait, I'm Still Ugly">
				<p>Any changes you've made will be lost. Are you sure you want to bail?</p>
			</Dialog>
			<Dialog title="Finalize Your New Look?" open={saving} onAccept={onSave} onDecline={() => setSaving(false)} acceptLang="Sculpt Me, Doctor" declineLang="Actually, Wait">
				{admin ? (
					<p>This procedure is free — the surgeon said they need the practice.</p>
				) : (
					<p>This procedure will cost <span style={{ color: '#208692', fontWeight: 700 }}>{CurrencyFormat.format(cost)}</span>.</p>
				)}
				<p>Ready to commit to the new look?</p>
			</Dialog>
		</div>
	);
};
