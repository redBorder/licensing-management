import React, { Component } from 'react';
import Auth from '../modules/Auth';
import CreateUserForm from '../components/CreateUserForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class CreateUserPage extends Component {

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
        email: '',
        password: '',
        organization: '',
        confir_password: '',
        name: ''
      },
      user: {
        email: '',
        password: '',
        organization: '',
        confir_password: '',
        name: '', 
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
    xhr.open('get', '/api/users/new'); //CAMBIAR POR /users/new
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        {xhr.response.message && toastr.success(xhr.response.message)}
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

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const confir_password = encodeURIComponent(this.state.user.confir_password);
    const organization = encodeURIComponent(this.state.user.organization);
    const role = this.state.user.admin ? "admin" : "normal";
    const formData = `role=${role}&name=${name}&organization=${organization}&email=${email}&password=${password}&confir_password=${confir_password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/users');
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
          errors: {}
        });

      } else {
        // failure
        {xhr.response.message && toastr.error(xhr.response.message)}
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
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
    //Esto es para validar el formulario visualmente, solo para el usuario
    if(this.state.user.password !== this.state.user.confir_password){
      this.state.errors.password="error";
      this.state.errors.confir_password="error";
    }
    else{
      this.state.errors.password="success";
      this.state.errors.confir_password="success";
    }
    if(this.state.user.password.length < 8 || this.state.user.password.length > 15)
      this.state.errors.password="error";
    if(this.state.user.confir_password.length <8 || this.state.user.confir_password.length > 15)
      this.state.errors.confir_password="error";

    if(this.state.user.name.length!=0)
      this.state.errors.name="success";
    else
      this.state.errors.name="error"
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <CreateUserForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        organizations={this.state.organizations}
      />
    );
  }

}

CreateUserPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateUserPage;