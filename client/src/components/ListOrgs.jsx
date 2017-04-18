import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';


const ListOrgs = ({organizations, error }) => (
	<div>
	<Panel header="Organizations" bsStyle="info">
	  		This is the list of the organizations registered
	</Panel>
	{error && 
            <Panel header="Error message" bsStyle="danger">
              {error}
            </Panel>
    }
	<ListGroup>
	{
		organizations.map((organization) => {
			return (
				<ListGroupItem key={organization.id} >
					<div key={organization.id}> 
						<span>Name: {organization.name} {"Email: " + organization.email}</span> 
					</div>
	    		</ListGroupItem>
    		);
		})
	}
	</ListGroup>
 	</div>
);


export default ListOrgs;