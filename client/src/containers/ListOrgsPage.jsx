import React, { Component } from 'react';
import ListOrgs from '../components/ListOrgs.jsx'
import Auth from '../modules/Auth';
import toastr from 'toastr';

class ListOrgsPage extends Component {
  constructor() {
    super();
    toastr.options={
      "closeButton": true,
      "preventDuplicates": true,
      "newestOnTop": true
    }
    this.state={
    	organizations: [
    	]
    }
  }

  //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
  	 //Utilizando ajax, en el constructor pedimos la lista de organizations registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/listOrgs');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          organizations: xhr.response.orgs
        });

      } else {
        // failure
        {xhr.response.message && toastr.error(xhr.response.message)}
      	}
    });
    xhr.send();
  }
  render(){
    return <ListOrgs organizations={this.state.organizations}/>
  }
}

export default ListOrgsPage;
