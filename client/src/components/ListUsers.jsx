import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

const ListUsers = ({usuarios, error }) => (
	<div>
	    <div className="row">
	    	<div className="col-md-10">
	    		<h1 style={{color:"brown"}} > Users registered at database</h1>
	    	</div>
	    	<div className="col-md-2" >
				<button className="btn btn-primary text-right"><Link style={{color:"white"}} to="/createUser">Create new user </Link></button>
		   	</div>
	   	</div>
	   	<div className="row">
	   		<br></br>
			<ListGroup>
			{
				usuarios.map((usuario, key) => {
					return (
						<ListGroupItem key={usuario.id} >
							<div className="row" key={usuario.id}> 
								<div className="col-md-1">
									<span style={{color:"blue"}}>User {key} </span>
								</div>
								<div className="col-md-3">
									<span style={{color:"blue"}}>Name: </span> 
									<span>{usuario.name}</span> 
								</div>
								<div className="col-md-3">
									<span style={{color:"blue"}}>Name: </span>
									<span>{usuario.email}</span> 
								</div>
								<div className="col-md-3">
									<span style={{color:"blue"}}>Role: </span>
									<span>{usuario.role}</span> 
								</div>
								<div className="col-md-1">
									{usuario.id!=localStorage.getItem('userProfileId') ? <Link style={{color:"red"}} to={"/removeUsersAdmin/" + usuario.id} ><span className="glyphicon glyphicon-remove"></span></Link> : <span style={{color:"blue"}} className="glyphicon glyphicon-user"> You</span> }
								</div>
								<div className="col-md-1">
									<Link to={"/editUserAdmins/" + 
									usuario.id + "/" + encodeURIComponent(usuario.name) + "/" + encodeURIComponent(usuario.email)} className="glyphicon glyphicon-edit" style={{color:"greenº"}} ></Link>
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


export default ListUsers;