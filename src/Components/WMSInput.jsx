import React from 'react';
import TextField from '@mui/material/TextField';

const WMSInput = (props) => {
	return (
		<TextField
			defaultValue={props.value}
			error={props.error}
			required={props.required}
			onChange={props.onChange}
			sx={{ maxWidth: 800, minWidth: 300, m: 0.5 }}
			id={props.label}
			label={props.label}
		/>
	);
};

export default WMSInput;
