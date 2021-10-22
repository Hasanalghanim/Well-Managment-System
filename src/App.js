import React from 'react';
import './App.css';
import WMSNavbar from './Components/WMSNavbar';
import CreateView from './views/Create';
import ReadView from './views/View';
import HistoryView from './views/History';

import UpdateView from './views/Update';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='App'>
				<WMSNavbar />
				<Switch>
					<Route exact path='/'>
						<ReadView />
					</Route>
					<Route path='/create-well'>
						<CreateView />
					</Route>
					<Route path='/update/:well_id/'>
						<UpdateView />
					</Route>
					<Route path='/history/:well_id/'>
						<HistoryView />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
