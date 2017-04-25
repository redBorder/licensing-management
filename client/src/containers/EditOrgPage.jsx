import React, { Component } from 'react';
import Auth from '../modules/Auth';
import EditOrgForm from '../components/EditOrgForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class EditOrgPage extends Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
    toastr.options={
      "closeButton": true,
      "preventDuplicates": true,
      "newestOnTop": true
    }
    // set the initial component state
    this.state = {
      errors: {
        name: '',
        email: '',
        cluster_id: ''
      },
      organization: {
        name: '',
        email: '',
        cluster_id: '' 
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeOrg = this.changeOrg.bind(this);
  }

   //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
     //Utilizando ajax, en el constructor pedimos la lista de organizaciones registradas
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/organizations/' + this.props.params.id + "/edit"); 
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          error: "",
          organization: {
            name: xhr.response.org.name,
            email: xhr.response.org.email,
            cluster_id: xhr.response.org.cluster_id 
          }
       });
      } else {
        // failure
        // change the component state
        error = xhr.response.message;
        {error && toastr.success(error)}
        this.setState({
          error
        });
        }
    });
    xhr.send();
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name  = encodeURIComponent(this.state.organization.name);
    const email = encodeURIComponent(this.state.organization.email);
    const cluster_id = encodeURIComponent(this.state.organization.cluster_id);
    const formData = `email=${email}&name=${name}&cluster_id=${cluster_id}`;
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('put', '/api/organizations/' + this.props.params.id);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        {xhr.response.message && toastr.success(xhr.response.message)}
        // change the component-container state
        this.setState({
          errors: {},
          organization: xhr.response.org
        });
      } else {
        // failure
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        {xhr.response.message && toastr.error(xhr.response.message)}
        this.setState({
          successMessage:"",
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the organization object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeOrg(event) {
    const field = event.target.name;
    const organization = this.state.organization;
    organization[field] = event.target.value;
    this.setState({
        organization
      });
  
    
    //Esto es para validar el formulario visualmente, solo para el usuario

    if(this.state.organization.name.length!=0)
      this.state.errors.name="success";
    else
      this.state.errors.name="error"

    if(this.state.organization.cluster_id.length!=0)
      this.state.errors.cluster_id="success";
    else
      this.state.errors.cluster_id="error"

    if(this.state.organization.email.length!=0)
      this.state.errors.email="success";
    else
      this.state.errors.email="error"

    
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <EditOrgForm
        onSubmit={this.processForm}
        onChange={this.changeOrg}
        errors={this.state.errors}
        organization={this.state.organization}
      />
    );
  }

}

EditOrgPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditOrgPage;