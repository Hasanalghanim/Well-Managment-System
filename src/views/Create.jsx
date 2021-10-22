import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import WMSInput from '../Components/WMSInput';
import WMSButton from '../Components/WMSButton';
import { Grid } from '@mui/material/';
import Alert from '@mui/material/Alert';

import WMSDateTime from '../Components/WMSDateTime';

const CreateView = () => {
	const [dataUpdated, setDataUpdated] = useState(undefined);
	const [dataNotUpdated, setDataNotUpdated] = useState(undefined);
	const [requiredID, setRequiredID] = useState(false);
	const [requiredWellName, setRequiredWellName] = useState(false);
	const [inputValue, setInputValue] = useState({
		uwid: '',
		wellName: '',
		licenseNumber: '',
		area: '',
		field: '',
		totalDepth: 0,
		drillingDate: '',
		status: '',
	});

	let history = useHistory();

	/* any On change triggers which request, 
	f === input name requesting, 
	e === the value
	copies orignal state and changes the value of f with e*/
	const onChange = (f, e) => {
		switch (f) {
			case 'uwid':
				setInputValue({ ...inputValue, uwid: e });
				break;
			case 'wellName':
				setInputValue({ ...inputValue, wellName: e });
				break;
			case 'licenseNumber':
				setInputValue({ ...inputValue, licenseNumber: e });
				break;
			case 'area':
				setInputValue({ ...inputValue, area: e });
				break;
			case 'field':
				setInputValue({ ...inputValue, field: e });
				break;
			case 'totalDepth':
				setInputValue({ ...inputValue, totalDepth: e });
				break;
			case 'drillDate':
				setInputValue({ ...inputValue, drillDate: e });
				break;
			case 'status':
				setInputValue({ ...inputValue, status: e });
				break;

			default:
		}
	};
	/* Post request to make well data, if status ===200,
redirects to main*/
	const url = 'https://turing-code-exercise.azurewebsites.net/api/v1/Well';
	const postData = (bodyData) => {
		axios
			.post(url, bodyData, {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			})
			.then((res) => {
				if (res.status === 200) {
					setDataUpdated(true);
					setTimeout(() => {
						history.push('/');
					}, 2000);
				} else {
					setDataNotUpdated(true);
					setTimeout(() => {
						setDataNotUpdated(false);
					}, 1000);
				}
			});
	};
	/* ensures that the reqired fields are NOT empty strings */
	const sendData = () => {
		if (inputValue.uwid === '' && inputValue.wellName === '') {
			setRequiredID(true);
			setRequiredWellName(true);
		} else if (inputValue.uwid === '') {
			setRequiredID(true);
			setRequiredWellName(false);
		} else if (inputValue.wellName === '') {
			setRequiredWellName(true);
			setRequiredID(false);
		} else {
			setRequiredWellName(false);
			setRequiredID(false);
			postData(inputValue);
		}
	};

	return (
		<Box
			component='span'
			sx={{
				mx: 5,
				maxWidth: 800,
				minHeight: 450,
				mt: 20,
				backgroundColor: 'white',
				p: 1,
				border: '2px solid grey',
				borderRadius: 2,
				alignItems: 'center',
			}}
			noValidate
			autoComplete='off'>
			<h2 className='cardHeader'>Create Well Data</h2>
			<Grid
				container
				direction='row'
				justifyContent='center'
				alignItems='center'>
				<Grid container xs={12} direction='row' justifyContent='center'>
					<WMSInput
						error={requiredID}
						required={true}
						label='Unique ID'
						onChange={(e) => {
							onChange('uwid', e.target.value);
						}}
					/>
					<WMSInput
						error={requiredWellName}
						required={true}
						label='Well Name'
						onChange={(e) => {
							onChange('wellName', e.target.value);
						}}
					/>
					<WMSInput
						required={false}
						label='License Number'
						onChange={(e) => {
							onChange('licenseNumber', e.target.value);
						}}
					/>
					<WMSInput
						required={false}
						label='Area'
						onChange={(e) => {
							onChange('area', e.target.value);
						}}
					/>
				</Grid>
				<Grid container xs={12} direction='row' justifyContent='center'>
					<WMSInput
						required={false}
						label='Field'
						onChange={(e) => {
							onChange('field', e.target.value);
						}}
					/>
					<WMSInput
						required={false}
						label='Total Depth'
						onChange={(e) => {
							onChange('totalDepth', e.target.value);
						}}
					/>
					<WMSDateTime
						onChange={(e) => {
							onChange('drillDate', e);
						}}
					/>
					<WMSInput
						required={false}
						label='Status'
						onChange={(e) => {
							onChange('status', e.target.value);
						}}
					/>
				</Grid>
				<WMSButton onClick={sendData} name='Create Well' />
			</Grid>
			{dataUpdated ? (
				<Alert className='popUpAlert' severity='success'>
					You have added this well to the DataBase
				</Alert>
			) : (
				<div></div>
			)}
			{dataNotUpdated ? (
				<Alert className='popUpAlert' severity='error'>
					Something went wrong. Try again later.
				</Alert>
			) : (
				<div></div>
			)}
		</Box>
	);
};

export default CreateView;
