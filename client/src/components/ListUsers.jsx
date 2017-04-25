import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

/*
Componente encargado de mostrar una tabla con los usuarios recibidos por parámetros.
Recibe los siguientes parámetros:
	1) users: Lista de usuarios a listar.
	2) removeUserFormat: Función encargada de dar formato a la entrada de la tabla correspondiente a la eliminación de un usuario
	3) editUserFormat: Función encargada de dar formato a la entrada de la tabla correspondiente a la edición de un usuario
	4) orgName: Nombre de la organización a la que pertenecen los usuarios que se están mostrando.
*/
const ListUsers = ({
	users, 
	removeUserFormat, 
	editUserFormat, 
	orgName }) => (
		<div>
	    <div className="row">
	    	<div className="col-md-10">
	    		{ //Si el nombre de la organización es "all" se mostrarán todos los usuarios 
	    			orgName === "all" ?
	    			<h1 className="text-left" style={{color:"brown"}} > All users </h1>
	    			:
	    			<h1 className="text-left" style={{color:"brown"}} > Users of {orgName} </h1>
	    			}
	    		</div>
	    		<div className="col-md-2" >
					<button className="btn btn-primary text-right"><Link style={{color:"white"}} to="/createUser">Create new user </Link></button>
		   		</div>
	   		</div>
	   		<div className="row">
	   			<br></br>
				<BootstrapTable data={users} >
					<TableHeaderColumn dataField="name"> Name </TableHeaderColumn>
					<TableHeaderColumn dataField="email" isKey> Email </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={editUserFormat} dataAlign="center" width="90"> Edit </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={removeUserFormat} dataAlign="center" width="90"> Remove </TableHeaderColumn>
				</BootstrapTable>
			</div>
 		</div>
);

//Haciendo uso de propTypes se comprueban que todos los parámetros son recibidos correctamente
ListUsers.propTypes = {
	orgName: PropTypes.string.isRequired,
	removeUserFormat: PropTypes.func.isRequired,
	editUserFormat: PropTypes.func.isRequired,
	users: PropTypes.array.isRequired
}
export default ListUsers;