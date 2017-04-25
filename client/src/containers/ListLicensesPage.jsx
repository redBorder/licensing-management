import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';
import ListLicenses from '../components/ListLicenses.jsx'
import Auth from '../modules/Auth';
import { Link } from "react-router";
import toastr from 'toastr';

class ListLicensesPage extends Component {
  constructor() {
    super();
    toastr.options={
      "closeButton": true,
      "preventDuplicates": true,
      "newestOnTop": true
    }
    this.state={
    	licenses: [
    	],
      activePage: 1, 
      number_licenses: '',
      orgName: ''
    }


    this.handleSelectPage=this.handleSelectPage.bind(this);
  }

  //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
    this.state.orgName=this.props.params.orgName;
  	this.loadLicenses(this.state.activePage, this.props.params.id);
  }

  loadLicenses(page, id){
    //Utilizando ajax, en el constructor pedimos la lista de licencias para esa organización
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/organizations/' + id + '/licenses?page=' + page);
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          licenses: xhr.response.licenses,
          number_licenses: xhr.response.number_licenses, 
        });

      } else {
        // failure
        {
          xhr.response.message && toastr.error(xhr.response.message)}
        }
    });
    xhr.send();
  }

  //Manejador para seleccionar la pagina a visualizar
  handleSelectPage(eventKey) {
    this.loadLicenses(eventKey, this.props.params.id)
    this.setState({
      activePage: eventKey,
    });
  }


  render(){
    return (
      <div className="container">
        <div>
          <ListLicenses orgName={this.state.orgName} licenses={this.state.licenses} orgId={this.props.params.id}/>
        </div>
        {
        this.state.number_licenses > 10 ? 
        <div className="text-center">
          <Pagination
            first 
            last 
            next
            prev
            ellipsis
            boundaryLinks
            bsSize="medium"
            items={Math.ceil(this.state.number_licenses/10)} //10 usuarios por página. Redondeamos para arriba
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


export default ListLicensesPage;
