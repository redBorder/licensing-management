import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';
import ListUsers from '../components/ListUsers.jsx'
import Auth from '../modules/Auth';
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
      number_users: ''
    }
    this.handleSelectPage=this.handleSelectPage.bind(this);
    //Obtenemos el mensaje si hemos eliminado un usuario correctamente, lo notificamos y eliminamos
    localStorage.getItem('successRemove') && toastr.success(localStorage.getItem('successRemove')) && localStorage.removeItem('successRemove')
  }

  //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
  	this.loadUsers(this.state.activePage);
  }

  loadUsers(page){
     //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/listUsers/' + page);
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
  
  removeUser(id, name, email){
    if(confirm('Are you sure to remove the user ' + name + " (" + email + ")" )){
      //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/removeUser/' + id);
      // set the authorization HTTP header
      xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          //Almacenamos el mensaje de respuesta
          localStorage.setItem('successRemove', xhr.response.message);
          //Recargamos la página para que recargue la lista de usuarios
          window.location.reload();
        } else {
          // failure
          {xhr.response.message && toastr.error(xhr.response.message)}
          }
      });
      xhr.send();
    }
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
      <div className="text-center">
        <Pagination
          first 
          last 
          next
          prev
          ellipsis
          boundaryLinks
          bsSize="large"
          items={Math.ceil(this.state.number_users/10)} //10 usuarios por página. Redondeamos para arriba
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelectPage} />
        <br />
        <ListUsers usuarios={this.state.users} removeUser={this.removeUser}/>
      </div>
        )
  }
}


export default ListUsersPage;
