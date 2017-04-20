import React from 'react';
import { Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const ListUsers = ({users, removeUserFormat, editUserFormat }) => (
	<div>
	    <div className="row">
	    	<div className="col-md-10">
	    		<h1 className="text-left" style={{color:"brown"}} > Users </h1>
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

ListUsers.propTypes = {
	removeUserFormat: PropTypes.func.isRequired,
	editUserFormat: PropTypes.func.isRequired,
	users: PropTypes.array.isRequired
}
export default ListUsers;