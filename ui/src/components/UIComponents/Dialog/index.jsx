import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	alpha,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		background: alpha(theme.palette.secondary.main, 0.7),
		color: theme.palette.text.primary,
	},
	dialogActions: {
		padding: '8px 12px',
		gap: 8,
	},
	btn: {
		minWidth: 96,
		height: 32,
		padding: '0 12px',
		borderRadius: 8,
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		letterSpacing: 0,
		color: theme.palette.text.primary,
		background: alpha(theme.palette.primary.main, 0.12),
		border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
		boxShadow: 'none',
		transition:
			'background 120ms ease, border-color 120ms ease, transform 120ms ease',
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

export default ({
	open,
	title,
	onAccept,
	onDecline,
	children,
	declineLang = 'Cancel',
	acceptLang = 'Save',
}) => {
	const classes = useStyles();

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={open}
			onClose={onDecline}
			PaperProps={{
				className: classes.dialogPaper,
			}}
		>
			<DialogTitle
				style={{
					userSelect: 'none',
				}}
			>
				{title}
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions className={classes.dialogActions}>
				<Button
					className={`${classes.btn} ${classes.btnDanger}`}
					onClick={onDecline}
				>
					{declineLang}
				</Button>

				<Button
					className={`${classes.btn} ${classes.btnPrimary}`}
					onClick={onAccept}
				>
					{acceptLang}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
