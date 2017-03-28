import React from 'react';
import { Panel } from 'react-bootstrap';


const Home = ({successMessage}) => (
	<div>
	  	<Panel header="Licenses management" bsStyle="info">
	  		This is the home page
	  	</Panel>
	  	{successMessage && 
	 	 		<Panel header="Success message" bsStyle="success">
	  			{successMessage}
	 	 		</Panel>
 	 	}
 	</div>

);

export default Home;