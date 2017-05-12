import React from 'react';
import { Panel } from 'react-bootstrap';

/*
Componente encargado de mostrar la pagina principal cuando un usuario se ha autenticado
No recibe parámetros
*/
const Dashboard = () => (
	<div>
		<Panel header="Licenses management" bsStyle="info">
  			This is the dashboard page, if you can see this, you are autenticated
 	 	</Panel>	
 	</div>
);


export default Dashboard;