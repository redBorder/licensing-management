import React, { Component } from 'react';
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
    	]
    }
  }

  //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
  	 //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/listUsers');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          users: xhr.response.users
        });

      } else {
        // failure
        {xhr.response.message && toastr.error(xhr.response.message)}
      	}
    });
    xhr.send();
  }
  render(){
    return <ListUsers usuarios={this.state.users}/>
  }
}

export default ListUsersPage;
