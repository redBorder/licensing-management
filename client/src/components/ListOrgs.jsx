import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

/*
Componente encargado de mostrar una tabla con las organizaciones recibidas por parámetros.
Recibe los siguientes parámetros:
	1) organizations: Lista de organizaciones a listar.
	2) removeOrgFormat: Función encargada de dar formato a la entrada de la tabla correspondiente a la eliminación de una organización
	3) editOrgFormat: Función encargada de dar formato a la entrada de la tabla correspondiente a la edición de una organización
	4) countUsersFormat: Función encargada de dar formato a la entrada de la tabla correspondiente al número de usuarios que existen en esa organización
*/
const ListOrgs = ({
	organizations, 
	removeOrgFormat, 
	listLicensesFormat, 
	editOrgFormat, 
	countUsersFormat}) => (
	 	<div>

		    <div className="row">
		    	<div className="col-md-10">
		    		<h1 className="text-left" style={{color:"brown"}} > Organizations </h1>
		    	</div>
		    	<div className="col-md-2">

					<button className="btn btn-primary text-right"><Link style={{color:"white"}} to="/organization/new">Create new organization </Link></button>
			   	</div>
		   	</div>
		   	<div className="row">
		   		<br></br>

				<BootstrapTable data={organizations} >
					<TableHeaderColumn dataField="name"> Name </TableHeaderColumn>
					<TableHeaderColumn dataField="email" isKey> Email </TableHeaderColumn>
					<TableHeaderColumn dataField="cluster_id"> Cluster Id </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={listLicensesFormat} dataAlign="center" width="90"> Licenses </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={countUsersFormat} dataAlign="center" width="90"> Users </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={editOrgFormat} dataAlign="center" width="90"> Edit </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={removeOrgFormat} dataAlign="center" width="90"> Remove </TableHeaderColumn>
				</BootstrapTable>
			</div>
	 	</div>
 	);

//Haciendo uso de propTypes se comprueba que todos los parámetros son recibidos de forma correcta por el componente
ListOrgs.propTypes = {
	removeOrgFormat: PropTypes.func.isRequired,
	editOrgFormat: PropTypes.func.isRequired,
	listLicensesFormat: PropTypes.func.isRequired,
	countUsersFormat: PropTypes.func.isRequired,
	organizations: PropTypes.array.isRequired
}

export default ListOrgs;