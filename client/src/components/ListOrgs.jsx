import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



const ListOrgs = ({organizations, removeOrgFormat, editOrgFormat, countUsersFormat}) => (
	 	<div>
		    <div className="row">
		    	<div className="col-md-10">
		    		<h1 className="text-left" style={{color:"brown"}} > Organizations </h1>
		    	</div>
		    	<div className="col-md-2">
					<button className="btn btn-primary text-right"><Link style={{color:"white"}} to="/createOrg">Create new organization </Link></button>
			   	</div>
		   	</div>
		   	<div className="row">
		   		<br></br>
				<BootstrapTable data={organizations} >
					<TableHeaderColumn dataField="name"> Name </TableHeaderColumn>
					<TableHeaderColumn dataField="email" isKey> Email </TableHeaderColumn>
					<TableHeaderColumn dataField="cluster_id"> Cluster Id </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={countUsersFormat} dataAlign="center" width="90"> Users </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={editOrgFormat} dataAlign="center" width="90"> Edit </TableHeaderColumn>
					<TableHeaderColumn dataField="id" dataFormat={removeOrgFormat} dataAlign="center" width="90"> Remove </TableHeaderColumn>
				</BootstrapTable>
			</div>
			<div className="row">
				<div className="col-md-2 text-right" >
					<button className="btn btn-secondary text-right"><Link style={{color:"white"}} to={"/listUsers/null/" +  encodeURIComponent("No Organization")}>User without organization </Link></button>
		   		</div>
			</div>
	 	</div>
 	);

ListOrgs.propTypes = {
	removeOrgFormat: PropTypes.func.isRequired,
	editOrgFormat: PropTypes.func.isRequired,
	countUsersFormat: PropTypes.func.isRequired,
	organizations: PropTypes.array.isRequired
}

export default ListOrgs;