import React from 'react';
import { Panel } from 'react-bootstrap';


const Dashboard = ({successMessage, errorMessage}) => (
	<div>
  		<Panel header="Licenses management" bsStyle="info">
  			This is the dashboard page, if you can see this, you are autenticated
 	 	</Panel>
 	 	{successMessage && 
 	 		<Panel header="Success message" bsStyle="success">
  			{successMessage}
 	 		</Panel>
 	 	}
 	 	{errorMessage && 
 	 		<Panel header="Error message" bsStyle="danger">
  			{errorMessage}
 	 		</Panel>
 	 	}
 	</div>
);


export default Dashboard;