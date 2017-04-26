import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

/*
Componente encargado de mostrar una tabla con las licencias recibidas por parámetros.
Recibe los siguientes parámetros:
	1) licenses: Lista de licencias a listar.
	2) orgName: Nombre de la organización a la que pertenecen las licencias que se están mostrando.
*/
const ListLicenses = ({
	licenses,
	orgId,
	orgName,
	expiresFormat }) => (
		<div>
	    <div className="row">
	    	<div className="col-md-10">
	    			<h1 className="text-left" style={{color:"brown"}} > Licenses of {orgName} </h1>
	    		</div>
	    		<div className="col-md-2" >
					<button className="btn btn-primary text-right"><Link style={{color:"white"}} to={"/createLicense/" + localStorage.getItem('userProfileId') + "/" +  orgId } >Create new license </Link></button>
		   		</div>
	   		</div>
	   		<div className="row">
	   			<br></br>
				<BootstrapTable data={licenses} >
					<TableHeaderColumn dataField="id" hidden isKey={true}> Id </TableHeaderColumn>
					<TableHeaderColumn dataField="license_uuid"> Id license </TableHeaderColumn>
					<TableHeaderColumn dataField="limit_bytes" > Limit bytes </TableHeaderColumn>
					<TableHeaderColumn dataField="expires_at" > Expires at </TableHeaderColumn>
				</BootstrapTable>
			</div>
 		</div>
);

//Haciendo uso de propTypes se comprueban que todos los parámetros son recibidos correctamente
ListLicenses.propTypes = {
	licenses: PropTypes.array.isRequired,
	orgName: PropTypes.string.isRequired,
	orgId: PropTypes.string.isRequired
}
export default ListLicenses;