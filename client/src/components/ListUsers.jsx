import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';


const ListUsers = ({usuarios, error }) => (
	<div>
	<Panel header="Users Registered" bsStyle="info">
	  		This is the list of the users registered
	</Panel>
	{error && 
            <Panel header="Error message" bsStyle="danger">
              {error}
            </Panel>
    }
	<ListGroup>
	{
		usuarios.map((usuario) => {
			return (
				<ListGroupItem key={usuario.id} >
					<div key={usuario.id}> 
						{usuario.id!=localStorage.getItem('userProfileId') ? <Link style={{color:"red"}} to={"/removeUsersAdmin/" + usuario.id} > Remove user </Link> : null }
						<span>Name: </span><Link to={"/editUserAdmins/" + 
						usuario.id + "/" + encodeURIComponent(usuario.name) + "/" + encodeURIComponent(usuario.email)}> {usuario.name} </Link> <span>{"Email: " + usuario.email + ". Role: " + usuario.role}</span> 
					</div>
	    		</ListGroupItem>
    		);
		})
	}
	</ListGroup>
 	</div>
);


export default ListUsers;