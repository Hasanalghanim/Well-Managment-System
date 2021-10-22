import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Grid } from '@mui/material/';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Alert from '@mui/material/Alert';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import WMSPopUp from '../Components/WMSPopUp';

const ReadView = () => {
	const [incomingData, setIncomingData] = useState();
	const [deleteWarning, setDeleteWarning] = useState(false);
	const [deleteId, setDeleteId] = useState();
	const [deleted, setDeleted] = useState(false);

	/* On Component render, get request to get all data, Rerenders if "IncomingData" ever changes*/
	const url = 'https://turing-code-exercise.azurewebsites.net/api/v1/Well';
	useLayoutEffect(() => {
		axios
			.get(url, {
				'Content-Type': 'application/json',
			})
			.then((res) => setIncomingData(res.data));
	}, [deleted]);

	/* delete Request which takes the id of the well.
	if states 200 pop Up appears*/
	const deleteData = () => {
		const deleteUrl = `https://turing-code-exercise.azurewebsites.net/api/v1/Well/${deleteId}`;
		axios.delete(deleteUrl).then((res) => {
			if (res.status === 200) {
				setDeleted(true);
				setTimeout(() => {
					setDeleted(false);
				}, 3000);
			}
		});
	};
	/* On click to allow popUp apear to confirm delete*/
	const onClickDelete = (id) => {
		setDeleteWarning(true);
		setDeleteId(id);
	};

	/*After cdelete confirmed Via popUP,
	Delete request gets triggered*/
	const onDelete = () => {
		setDeleteWarning(false);
		deleteData();
	};

	return (
		<>
			<WMSPopUp
				onDelete={onDelete}
				open={deleteWarning}
				closed={() => setDeleteWarning(false)}
			/>
			<Grid
				className='viewTable'
				container
				direction='column'
				justifyContent='center'
				alignItems='center'>
				<div className='mainHeader'>
					<h1>Welcome to Olive Oils </h1>
					<h3>The following data is from your current Wells </h3>
				</div>
				<TableContainer
					component={Paper}
					sx={{
						maxWidth: 1000,
						minWidth: 100,
						maxHeight: 500,
						minHeight: 100,
					}}>
					<Table stickyHeader>
						<TableHead>
							<TableRow className='tableHeader'>
								<TableCell sx={{ color: 'white' }}> History</TableCell>
								<TableCell sx={{ color: 'white' }}>Well Name</TableCell>
								<TableCell sx={{ color: 'white' }}>UWID</TableCell>
								<TableCell sx={{ color: 'white' }}>ID</TableCell>
								<TableCell sx={{ color: 'white' }}>License Number</TableCell>
								<TableCell sx={{ color: 'white' }}>Area</TableCell>
								<TableCell sx={{ color: 'white' }}>Field</TableCell>
								<TableCell sx={{ color: 'white' }}>Total Depth</TableCell>
								<TableCell sx={{ color: 'white' }}>Drill Date</TableCell>
								<TableCell sx={{ color: 'white' }}>Status</TableCell>
								<TableCell sx={{ color: 'white' }}>Edit</TableCell>
								<TableCell sx={{ color: 'white' }}>Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{incomingData === undefined ? (
								<Backdrop
									sx={{
										color: '#fff',
										zIndex: (theme) => theme.zIndex.drawer + 1,
									}}
									open={true}>
									<CircularProgress color='inherit' />
								</Backdrop>
							) : (
								incomingData.map((well) => (
									<TableRow key={well.uwid} sx={{}}>
										<TableCell>
											<Link className='editBtn' to={`history/${well.id}/`}>
												<HistoryIcon />
											</Link>
										</TableCell>
										<TableCell>{well.wellName}</TableCell>
										<TableCell>{well.uwid}</TableCell>
										<TableCell>{well.id}</TableCell>
										<TableCell>{well.licenseNumber}</TableCell>
										<TableCell>{well.area}</TableCell>
										<TableCell>{well.field}</TableCell>
										<TableCell>{well.totaldepth}</TableCell>
										<TableCell>{well.drillDate}</TableCell>
										<TableCell>{well.status}</TableCell>
										<TableCell>
											<Link className='editBtn' to={`update/${well.id}/`}>
												<EditIcon />
											</Link>
										</TableCell>
										<TableCell>
											<Link
												className='deleteBtn'
												onClick={() => onClickDelete(well.id)}
												to={'/'}>
												<DeleteIcon />
											</Link>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{deleted ? (
					<Alert className='popUpAlert' severity='error'>
						Delete was successful
					</Alert>
				) : null}
			</Grid>
		</>
	);
};

export default ReadView;
