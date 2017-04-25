import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';
import ListUsers from '../components/ListUsers.jsx'
import Auth from '../modules/Auth';
import { Link } from "react-router";
import toastr from 'toastr';

class ListUsersPage extends Component {
  constructor() {
    super();
    toastr.options={
      "closeButton": true,
      "preventDuplicates": true,
      "newestOnTop": true
    }
    this.state={
    	users: [
    	],
      activePage: 1, 
      number_users: '',
      orgName: ''
    }
    this.handleSelectPage=this.handleSelectPage.bind(this);
    //Obtenemos el mensaje si hemos eliminado un usuario correctamente, lo notificamos y eliminamos
    localStorage.getItem('successRemoveUser') && toastr.success(localStorage.getItem('successRemoveUser')) && localStorage.removeItem('successRemoveUser')
  }

  //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
    this.state.orgName=this.props.params.orgName;
  	this.loadUsers(this.state.activePage, this.props.params.id);
  }

  loadUsers(page, id){
    if(id=="all"){
     //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/users?page=' + page);
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          users: xhr.response.users,
          number_users: xhr.response.number_users
        });

      } else {
        // failure
        {
          xhr.response.message && toastr.error(xhr.response.message)}
        }
    });
    xhr.send();
    }
    else if(id="null"){
    //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/organizations/null/users?page=' + page);
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          users: xhr.response.users,
          number_users: xhr.response.number_users, 
        });

      } else {
        // failure
        {
          xhr.response.message && toastr.error(xhr.response.message)}
        }
    });
    xhr.send();
    }else 
    {
    //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/organizations/' + id + '/users?page=' + page);
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          users: xhr.response.users,
          number_users: xhr.response.number_users, 
        });

      } else {
        // failure
        {
          xhr.response.message && toastr.error(xhr.response.message)}
        }
    });
    xhr.send();
    }
  }

   //Manejadores de la tabla

  editUserFormat(cell, row){
      return (<div>
          {
            row.id!=localStorage.getItem('userProfileId') 
          ?
            <Link to={"/editUserAdmins/" + 
            row.id} 
            className="glyphicon glyphicon-edit" 
            style={{color:"green"}} ></Link>
          : 
          <span style={{color:"blue"}} 
          className="glyphicon glyphicon-user"> 
          You</span> 
          }
         </div>);
  }
  
  removeUserFormat(cell, row){
      return (<div>
            <Link style={{color:"red"}} 
            onClick={() => {
              if(confirm('Are you sure to remove the user ' + row.name + " (" + row.email + ")" )){
                //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
                // create an AJAX request
                const xhr = new XMLHttpRequest();
                xhr.open('delete', '/api/users/' + row.id);
                // set the authorization HTTP header
                xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
                xhr.responseType = 'json';
                xhr.addEventListener('load', () => {
                  if (xhr.status === 200) {
                    //Almacenamos el mensaje de respuesta
                    localStorage.setItem('successRemoveUser', xhr.response.message);
                    //Recargamos la página para que recargue la lista de usuarios
                    window.location.reload();
                  } else {
                    // failure
                    {xhr.response.message && toastr.error(xhr.response.message)}
                    }
                });
                xhr.send();
              }
            }} 
            className="glyphicon glyphicon-remove"></Link> 
         </div>);
  }


  //Manejador para seleccionar la pagina a visualizar
  handleSelectPage(eventKey) {
    this.loadUsers(eventKey)
    this.setState({
      activePage: eventKey,
    });
  }


  render(){
    return (
      <div className="container">
        <div>
          <ListUsers orgName={this.state.orgName} users={this.state.users} editUserFormat={this.editUserFormat} removeUserFormat={this.removeUserFormat}/>
        </div>
        {
        this.state.number_users > 10 ? 
        <div className="text-center">
          <Pagination
            first 
            last 
            next
            prev
            ellipsis
            boundaryLinks
            bsSize="medium"
            items={Math.ceil(this.state.number_users/10)} //10 usuarios por página. Redondeamos para arriba
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelectPage} />
        </div>
        : null
      }
      </div>
        )
  }
}


export default ListUsersPage;
