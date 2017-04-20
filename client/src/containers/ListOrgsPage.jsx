import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';
import ListOrgs from '../components/ListOrgs.jsx'
import Auth from '../modules/Auth';
import { Link } from 'react-router';
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
      activePage: 1,
    	organizations: [
    	],
      number_orgs: ''
    }
    this.handleSelectPage=this.handleSelectPage.bind(this);
    //Obtenemos el mensaje si hemos eliminado una organizacion correctamente, lo notificamos y eliminamos
    localStorage.getItem('successRemoveOrg') && toastr.success(localStorage.getItem('successRemoveOrg')) && localStorage.removeItem('successRemoveOrg')
  }
  //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
  	this.loadOrgs(this.state.activePage);
  }

  loadOrgs(page){
     //Utilizando ajax, en el constructor pedimos la lista de organizations registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/organizations/' + page);
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          organizations: xhr.response.orgs,
          number_orgs: xhr.response.number_orgs
        });
      } else {
        // failure
        {xhr.response.message && toastr.error(xhr.response.message)}
        }
    });
    xhr.send();
  }


  //Manejadores de la tabla

  editOrgFormat(cell, row){
      return (<div>
           <Link to={"/editOrgAdmins/" + 
          row.id + "/" + 
          encodeURIComponent(row.name) + "/" + 
          encodeURIComponent(row.email)} 
          className="glyphicon glyphicon-edit" 
          style={{color:"green"}} ></Link>
         </div>);
  }
  
  removeOrgFormat(cell, row){
      return (<div>
            <Link style={{color:"red"}} 
            onClick={() => {
              if(confirm('Are you sure to remove the organization ' + row.name + " (" + row.email + "). This will remove all user references to this organization"  )){
                //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
                // create an AJAX request
                const xhr = new XMLHttpRequest();
                xhr.open('delete', '/api/organizations/' + row.id);
                // set the authorization HTTP header
                xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
                xhr.responseType = 'json';
                xhr.addEventListener('load', () => {
                  if (xhr.status === 200) {
                    //Almacenamos el mensaje de respuesta
                    localStorage.setItem('successRemoveOrg', xhr.response.message);
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
    this.loadOrgs(eventKey)
    this.setState({
      activePage: eventKey,
    });
  }

  render(){
    return (
      <div className="container">
        <div>
          <ListOrgs organizations={this.state.organizations} removeOrgFormat={this.removeOrgFormat} editOrgFormat={this.editOrgFormat}/>
        </div>
        <div className="text-center">
          <Pagination
            first 
            last 
            next
            prev
            ellipsis
            boundaryLinks
            bsSize="medium"
            items={Math.ceil(this.state.number_orgs/10)} //10 organizations por página. Redondeamos para arriba
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelectPage} />
        </div>
      </div>
        )
  }
}

export default ListOrgsPage;
