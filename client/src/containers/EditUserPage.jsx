import React, { Component } from 'react';
import Auth from '../modules/Auth';
import EditUserForm from '../components/EditUserForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class EditUserPage extends Component {

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
        email: ''
      },
      user: {
        name: '',
        email: '',
        organization: 'No',
        admin: false
      },
      organizations: []
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

   //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
     //Utilizando ajax, en el constructor pedimos la lista de organizaciones registradas
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/users/' + this.props.params.id + "/edit"); 
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
          user: {
            name: xhr.response.user.name,
            email: xhr.response.user.email,
            organization: xhr.response.user.organizationId || "No" //Si no tiene organización se pondrá "No" 
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
    const name  = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const role = this.state.user.admin ? "admin" : "normal";
    const organization = this.state.user.organization;
    const formData = `email=${email}&name=${name}&role=${role}&organization=${organization}`;
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('put', '/api/users/' + this.props.params.id);
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
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    if(field!="role")
    { 
      user[field] = event.target.value;
      
    }else{
      user.admin = !user.admin;
    }
    this.setState({
        user
      });
    
    console.log(this.state.user);
    
    //Esto es para validar el formulario visualmente, solo para el usuario

    if(this.state.user.name.length!=0)
      this.state.errors.name="success";
    else
      this.state.errors.name="error"

    if(this.state.user.email.length!=0)
      this.state.errors.email="success";
    else
      this.state.errors.email="error"

    
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <EditUserForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        organizations={this.state.organizations}
      />
    );
  }

}

EditUserPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditUserPage;