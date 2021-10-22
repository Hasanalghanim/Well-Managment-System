import React from 'react';
import { Button } from '@mui/material/';

const WMSButton = (props) => {
	return (
		<Button
			onClick={props.onClick}
			variant='contained'
			sx={{ mt: 2, borderRadius: 3 }}>
			{props.name}
		</Button>
	);
};

export default WMSButton;
