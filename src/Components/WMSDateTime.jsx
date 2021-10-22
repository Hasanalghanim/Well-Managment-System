import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

const WMSDateTime = (props) => {
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					disabled={props.disabled}
					value={props.value}
					inputFormat='yyyy/MM/dd'
					renderInput={(props) => (
						<TextField
							sx={{ maxWidth: 800, minWidth: 300, m: 0.5 }}
							{...props}
						/>
					)}
					label='Drill Date'
					onChange={(e) => props.onChange(e)}
				/>
			</LocalizationProvider>
		</>
	);
};

export default WMSDateTime;
