import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material/';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const HistoryView = () => {
	const { well_id } = useParams();

	const [incomingData, SetIncomingData] = useState();

	/*on component load, get request made using well_id params, 
	sets data in component state*/
	const url = `https://turing-code-exercise.azurewebsites.net/api/v1/Well/${well_id}/history`;
	useLayoutEffect(() => {
		axios
			.get(url, {
				'Content-Type': 'application/json',
			})
			.then((res) => SetIncomingData(res.data));
	}, [url]);
	return (
		<>
			<Grid
				container
				className='viewTable'
				direction='column'
				justifyContent='center'
				alignItems='center'>
				<div className='mainHeader'>
					<h1>You are currently checking history</h1>
				</div>
				<TableContainer
					component={Paper}
					sx={{
						maxWidth: 1000,
						minWidth: 100,
						maxHeight: 500,
						minHeight: 200,
					}}>
					<Table stickyHeader>
						<TableHead>
							<TableRow className='tableHeader'>
								<TableCell sx={{ color: 'white' }}>UWID</TableCell>
								<TableCell sx={{ color: 'white' }}>ID</TableCell>

								<TableCell sx={{ color: 'white' }}>Change Data</TableCell>
								<TableCell sx={{ color: 'white' }}>Action</TableCell>
								<TableCell sx={{ color: 'white' }}>Admin</TableCell>
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
										<TableCell>{well.uwid}</TableCell>
										<TableCell>{well.wellId}</TableCell>
										<TableCell>{well.action}</TableCell>
										<TableCell>{well.changeDate}</TableCell>
										<TableCell>{well.admin}</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</>
	);
};

export default HistoryView;
