import React from 'react';
import { Panel } from 'react-bootstrap';

const Dashboard = ({errorMessage}) => (
	<div>
		<Panel header="Licenses management" bsStyle="info">
  			This is the dashboard page, if you can see this, you are autenticated
 	 	</Panel>	
 	</div>
);


export default Dashboard;