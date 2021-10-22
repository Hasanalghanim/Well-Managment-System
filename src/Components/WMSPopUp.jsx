import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const PopUp = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={props.closed}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>{'Delete Requested'}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					You are trying to delete some Well data. This action can NOT be
					undone, are you sure you want to delete this data?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.closed}>Cancel</Button>
				<Button onClick={props.onDelete} autoFocus>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PopUp;
