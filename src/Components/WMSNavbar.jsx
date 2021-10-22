import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WMSNavbar = () => {
	return (
		<div className='navBar'>
			<ul className='navBarLink'>
				<li>
					<Link className='navLink' to='/'>
						View All
					</Link>
				</li>
				<li>
					<Link className='navLink' to='/create-well'>
						Create
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default WMSNavbar;
