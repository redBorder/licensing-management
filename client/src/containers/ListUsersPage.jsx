import React, { Component } from 'react';
import ListUsers from '../components/ListUsers.jsx'
import Auth from '../modules/Auth';


class ListUsersPage extends Component {
  constructor() {
    super();

    this.state={
    	users: [
    	]
    }
  }
  componentWillMount(){
  	console.log("Se llama")
  	 //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/listUsers');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
      	console.log("correcto");
        // success
        // change the component-container state
        this.setState({
          error: "",
          users: xhr.response.users
        });

      } else {
        // failure
      	console.log("fallo");

        // change the component state
        error = xhr.response.message;

        this.setState({
          error
        });
      	}
    });
    xhr.send();
  }
  render(){
    return <ListUsers usuarios={this.state.users} error={this.state.error}/>
  }
}

export default ListUsersPage;
