import React from 'react';
import { Panel } from 'react-bootstrap';


const Dashboard = ({secretData}) => (
	<div>
  		<Panel header="Licenses management" bsStyle="info">
  			This is the dashboard page, if you can see this, you are autenticated
 	 	</Panel>
 	 	{secretData && 
 	 		<Panel header="Success message" bsStyle="success">
  			{secretData}
 	 		</Panel>
 	 	}
 	</div>
);


export default Dashboard;