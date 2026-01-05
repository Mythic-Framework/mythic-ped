import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, alpha, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TabPanel, Dialog } from '../../components/UIComponents';
import { Face } from '../../components';
import { SavePed } from '../../actions/pedActions';
import Body from '../../components/Body/Body';
import Hair from '../../components/Hair/Hair';
import Clothes from '../../components/Clothes/Clothes';
import Tattoo from '../../components/Tattoos';
import Accessories from '../../components/Accessories/Accessories';
import Naked from '../../components/PedComponents/Naked';
import FaceMakeup from '../../components/Face/FaceMakeup/FaceMakeup';
import Wrapper from '../../components/UIComponents/Wrapper/Wrapper';
import Nui from '../../util/Nui';
import CamBar from '../../components/UIComponents/CamBar';

const useStyles = makeStyles((theme) => ({
	save: {
		position: 'absolute',
		bottom: '1%',
		left: '1%',
		'& svg': {
			marginLeft: 6,
		},
	},
	panelShell: {
		position: 'absolute',
		right: 20,
		top: '4vh',
		width: 500,
		height: '92vh',
		display: 'flex',
		flexDirection: 'column',
		background: alpha(theme.palette.secondary.dark, 0.69),
		borderRadius: 10,
		overflow: 'hidden',
	},
	tabHeader: {
		flex: '0 0 auto',
		borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
	},
	tabs: {
		minHeight: 44,
	},
	tab: {
		minHeight: 44,
		minWidth: 60,
		padding: 0,
		textTransform: 'none',
		opacity: 0.85,
		'&.Mui-selected': {
			opacity: 1,
		},
		'& svg': {
			fontSize: 18,
		},
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
		padding: 8,
		borderRadius: 10,
	},
	btn: {
		minWidth: 110,
		height: 34,
		padding: '0 12px',
		borderRadius: 8,
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		letterSpacing: 0,
		color: theme.palette.text.primary,
		background: alpha(theme.palette.primary.main, 0.35),
		border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
		boxShadow: 'none',
		transition:
			'background 120ms ease, transform 120ms ease, border-color 120ms ease',
		'&:hover': {
			background: alpha(theme.palette.primary.main, 0.45),
			borderColor: alpha(theme.palette.primary.main, 0.35),
			transform: 'translateY(-1px)',
			boxShadow: 'none',
		},
		'&:active': {
			transform: 'translateY(0px)',
		},
		'& .MuiButton-startIcon': {
			marginRight: 8,
		},
		'& .MuiButton-startIcon svg': {
			fontSize: 12,
			opacity: 0.85,
		},
	},
	btnPrimary: {
		background: alpha(theme.palette.success.main, 0.35),
		borderColor: alpha(theme.palette.success.main, 0.25),
		'&:hover': {
			background: alpha(theme.palette.success.main, 0.45),
			borderColor: alpha(theme.palette.success.main, 0.35),
		},
	},
	btnDanger: {
		background: alpha(theme.palette.error.main, 0.35),
		borderColor: alpha(theme.palette.error.main, 0.25),
		'&:hover': {
			background: alpha(theme.palette.error.main, 0.45),
			borderColor: alpha(theme.palette.error.main, 0.35),
		},
	},
}));

export default (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.app.state);

	const [saving, setSaving] = useState(false);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onSave = () => {
		setSaving(false);
		dispatch(SavePed(state));
	};

	return (
		<div>
			<CamBar />
			<div className={classes.panelShell}>
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
						<Tab
							label={
								<FontAwesomeIcon
									icon={['fas', 'face-grimace']}
								/>
							}
						/>
						<Tab
							label={
								<FontAwesomeIcon
									icon={['fas', 'child-reaching']}
								/>
							}
						/>
						<Tab
							label={
								<FontAwesomeIcon icon={['fas', 'scissors']} />
							}
						/>
						<Tab
							label={
								<FontAwesomeIcon icon={['fas', 'teeth-open']} />
							}
						/>
						<Tab
							label={<FontAwesomeIcon icon={['fas', 'shirt']} />}
						/>
						<Tab
							label={<FontAwesomeIcon icon={['fas', 'mitten']} />}
						/>
						<Tab
							label={<FontAwesomeIcon icon={['fas', 'atom']} />}
						/>
					</Tabs>
				</div>

				<div className={classes.panelBody}>
					<TabPanel value={value} index={0}>
						<Face />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Body />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Hair />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Wrapper>
							<FaceMakeup />
						</Wrapper>
					</TabPanel>
					<TabPanel value={value} index={4}>
						<Clothes />
					</TabPanel>
					<TabPanel value={value} index={5}>
						<Accessories />
					</TabPanel>
					<TabPanel value={value} index={6}>
						<Tattoo />
					</TabPanel>
				</div>
			</div>

			<Naked />
			<div className={classes.saveBar}>
				<Button
					className={`${classes.btn} ${classes.btnPrimary}`}
					onClick={() => setSaving(true)}
					startIcon={<FontAwesomeIcon icon={['fas', 'save']} />}
				>
					Finished, Lets Spawn
				</Button>
			</div>

			<Dialog
				title="Create Character Ped?"
				open={saving}
				onAccept={onSave}
				onDecline={() => setSaving(false)}
			>
				<p>Are you sure you want to save?</p>
				<p>
					You may not be able to edit some things after this screen,
					ensure you are totally done creating your character before
					you continue!
				</p>
			</Dialog>
		</div>
	);
};
