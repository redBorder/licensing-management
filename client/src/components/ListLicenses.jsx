import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

/*
Componente encargado de mostrar una tabla con las licencias recibidas por parámetros.
Recibe los siguientes parámetros:
	1) licenses: Lista de licencias a listar.
	2) orgName: Nombre de la organización a la que pertenecen las licencias que se están mostrando.
	3) orgId: Identificador de la organización para saber qué tipo de licencia hay que crear y a qué organización pertence (admin
	4) expiresFormat: Función encargada de mostrar el número de días restantes hasta la expiración de la licencia
*/
const ListLicenses = ({
	licenses,
	orgId,
	orgName,
	expiresFormat,
	sensorsFormat,
	downloadFormat,
	extendFormat,
	activateFormat }) => (
		<div>
	    <div className="row">
	    	<div className="col-md-10">
	    			<h1 className="text-left" style={{color:"brown"}} > Licenses of {orgName} </h1>
	    		</div>
	    		<div className="col-md-2" >
					<button className="btn btn-primary text-right"><Link style={{color:"white"}} to={"/license/new/" + localStorage.getItem('userProfileId') + "/" +  orgId } >Create new license </Link></button>
		   		</div>
	   		</div>
	   		<div className="row">
	   			<br></br>
				<BootstrapTable data={licenses} >
					<TableHeaderColumn dataField="id" hidden isKey={true}> Id </TableHeaderColumn>
					<TableHeaderColumn dataField="license_uuid"> Id license </TableHeaderColumn>
					<TableHeaderColumn dataField="limit_bytes" > Limit bytes </TableHeaderColumn>
					<TableHeaderColumn dataField="expires_at" dataFormat={expiresFormat} > Expires time </TableHeaderColumn>
					<TableHeaderColumn dataField="sensors" dataFormat={sensorsFormat}> Sensors </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={extendFormat} dataAlign='center' width="90"> Extend </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={downloadFormat} dataAlign='center' width="90"> Download </TableHeaderColumn>
					<TableHeaderColumn dataField="enabled" dataFormat={activateFormat} dataAlign='center' width="90"> Status </TableHeaderColumn>
				</BootstrapTable>
			</div>
 		</div>
);

//Haciendo uso de propTypes se comprueban que todos los parámetros son recibidos correctamente
ListLicenses.propTypes = {
	licenses: PropTypes.array.isRequired,
	sensorsFormat: PropTypes.func.isRequired,
	activateFormat: PropTypes.func.isRequired,
	extendFormat: PropTypes.func.isRequired,
	downloadFormat: PropTypes.func.isRequired,
	expiresFormat: PropTypes.func.isRequired,
	orgName: PropTypes.string.isRequired,
	orgId: PropTypes.string.isRequired
}
export default ListLicenses;