import React from 'react';
import { Panel } from 'react-bootstrap';


const Dashboard = ({successMessage}) => (
	<div>
  		<Panel header="Licenses management" bsStyle="info">
  			This is the dashboard page, if you can see this, you are autenticated
 	 	</Panel>
 	 	{successMessage && 
 	 		<Panel header="Success message" bsStyle="success">
  			{successMessage}
 	 		</Panel>
 	 	}
 	</div>
);


export default Dashboard;