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
    this.state.organizations
  }

  loadOrgs(page){
     //Utilizando ajax, en el constructor pedimos la lista de organizations registrados
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/organizations?page=' + page);
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

  listLicensesFormat(cell, row){
      return (<div>
           <Link to={"/listLicenses/" + 
          row.id + "/" + encodeURIComponent(row.name)} 
          className="glyphicon glyphicon-folder-open" 
          style={{color:"green"}} ></Link>
         </div>);
  }

  editOrgFormat(cell, row){
      return (<div>
           <Link to={"/organization/edit/" + 
          row.id } 
          className="glyphicon glyphicon-edit" 
          style={{color:"green"}} ></Link>
         </div>);
  }
  
  removeOrgFormat(cell, row){
      return (<div>
            <Link style={{color:"red"}} 
            onClick={() => {
              if(confirm('Are you sure to remove the organization ' + row.name + " (" + row.email + "). This will remove ALL licenses of this organizations"  )){
                //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
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

  countUsersFormat(cell,row){
    return (<Link style={{color:"blue"}} to={"/listUsers/" + row.id + "/" + encodeURIComponent(row.name) }>{row.Users.length}</Link>);
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
          <ListOrgs organizations={this.state.organizations} removeOrgFormat={this.removeOrgFormat} editOrgFormat={this.editOrgFormat} countUsersFormat={this.countUsersFormat} listLicensesFormat={this.listLicensesFormat}/>
        </div>
        {
          this.state.number_orgs > 10 ? 
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
        : null
      }
      </div>
        )
  }
}

export default ListOrgsPage;
