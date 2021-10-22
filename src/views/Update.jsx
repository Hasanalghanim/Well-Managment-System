import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import WMSInput from '../Components/WMSInput';
import WMSButton from '../Components/WMSButton';
import { Grid } from '@mui/material/';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import WMSDateTime from '../Components/WMSDateTime';

const UpdateView = () => {
	const [requiredID, setRequiredID] = useState(false);
	const [requiredWellName, setRequiredWellName] = useState(false);
	const [inputValue, setInputValue] = useState();
	const [dataUpdated, setDataUpdated] = useState(undefined);
	const [dataNotUpdated, setDataNotUpdated] = useState(undefined);

	let { well_id } = useParams();
	let history = useHistory();

	/*on Compnenet render,
	get request with ID to get Well data 
	gets set in state*/
	const getUrl = `https://turing-code-exercise.azurewebsites.net/api/v1/Well/${well_id}`;
	useLayoutEffect(() => {
		axios
			.get(getUrl, {
				'Content-Type': 'application/json',
			})
			.then((res) => {
				setInputValue(res.data);
			});
	}, [getUrl]);

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

	/*Put request once an update is request, 
	if state ===200 updated data pop up appears,
	 else failed popup appears
	 After update is made, redirects to view component */

	const updateUrl = `https://turing-code-exercise.azurewebsites.net/api/v1/Well/${well_id}`;
	const postData = (bodyData) => {
		axios
			.put(updateUrl, bodyData, {
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
			console.log(inputValue);
		}
	};

	return (
		<>
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
				<h2 className='cardHeader'>Update Well Data</h2>
				{inputValue === undefined ? (
					<Backdrop
						sx={{
							color: '#fff',
							zIndex: (theme) => theme.zIndex.drawer + 1,
						}}
						open={true}>
						<CircularProgress color='inherit' />
					</Backdrop>
				) : (
					<Grid
						container
						direction='row'
						justifyContent='center'
						alignItems='center'>
						<Grid container direction='row' justifyContent='center'>
							<WMSInput
								value={inputValue.id}
								error={requiredID}
								required={true}
								label='Unique ID'
								onChange={(e) => {
									onChange('uwid', e.target.value);
								}}
							/>
							<WMSInput
								error={requiredWellName}
								value={inputValue.wellName}
								required={true}
								label='Well Name'
								onChange={(e) => {
									onChange('wellName', e.target.value);
								}}
							/>
							<WMSInput
								value={inputValue.licenseNumber}
								required={false}
								label='License Number'
								onChange={(e) => {
									onChange('licenseNumber', e.target.value);
								}}
							/>
							<WMSInput
								value={inputValue.area}
								required={false}
								label='Area'
								onChange={(e) => {
									onChange('area', e.target.value);
								}}
							/>
						</Grid>
						<Grid container direction='row' justifyContent='center'>
							<WMSInput
								value={inputValue.field}
								required={false}
								label='Field'
								onChange={(e) => {
									onChange('field', e.target.value);
								}}
							/>
							<WMSInput
								value={inputValue.totalDepth}
								required={false}
								label='Total Depth'
								onChange={(e) => {
									onChange('totalDepth', e.target.value);
								}}
							/>
							<WMSDateTime
								value={inputValue.drillDate}
								disabled={true}
								onChange={(e) => {
									onChange('drillDate', e);
								}}
							/>
							<WMSInput
								value={inputValue.status}
								required={false}
								label='Status'
								onChange={(e) => {
									onChange('status', e.target.value);
								}}
							/>
						</Grid>
						<WMSButton onClick={sendData} name='Update' />
					</Grid>
				)}
				{dataUpdated ? (
					<Alert className='popUpAlert' severity='success'>
						You have updated well {inputValue.wellName}
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
		</>
	);
};

export default UpdateView;
