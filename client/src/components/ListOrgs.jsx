import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

const ListOrgs = ({organizations}) => (
 	<div>
	    <div className="row">
	    	<div className="col-md-10">
	    		<h1 style={{color:"brown"}} > Organizations registered at database</h1>
	    	</div>
	    	<div className="col-md-2">
				<button className="btn btn-primary text-right"><Link style={{color:"white"}} to="/createOrg">Create new organization </Link></button>
		   	</div>
	   	</div>
	   	<div className="row">
	   		<br></br>
			<ListGroup>
			{
				organizations.map((organization, key) => {
					return (
						<ListGroupItem key={organization.id} >
							<div className="row" key={organization.id}> 
								<div className="col-md-2">
									<span style={{color:"blue"}}>Org {key} </span>
								</div>
								<div className="col-md-5">
									<span style={{color:"blue"}}>Name: </span> 
									<span>{organization.name}</span> 
								</div>
								<div className="col-md-5">
									<span style={{color:"blue"}}>Email: </span>
									<span>{organization.email}</span> 
								</div>
							</div>
			    		</ListGroupItem>
		    		);
				})
			}
			</ListGroup>
		</div>
 	</div>
);


export default ListOrgs;