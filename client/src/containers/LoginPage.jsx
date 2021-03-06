import React, { Component } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';

class LoginPage extends Component {

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
        password: ''
      },
      user: {
        email: '',
        password: ''
      } 
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });
        {xhr.response.message && toastr.success(xhr.response.message)}
        // set a user profile items
        localStorage.setItem('userProfileId', xhr.response.user.id);
        localStorage.setItem('userProfileOrg', xhr.response.user.OrganizationId);
        localStorage.setItem('userProfileName', xhr.response.user.name);
        localStorage.setItem('userProfileEmail', xhr.response.user.email);
        localStorage.setItem('userProfileRole', xhr.response.user.role);

        // save the token
        Auth.authenticateUser(xhr.response.token);


        // change the current URL to /
        this.context.router.replace('/');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        {xhr.response.message && toastr.error(xhr.response.message)}
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
    user[field] = event.target.value;
    this.setState({
      user
    });

    //Esto es para validar el formulario visualmente, solo para el usuario

    
    if(event.target.name=="password" && user[field].length < 8 || user[field].length > 15)
      this.state.errors.password="error";
    else
      this.state.errors.password="success"

    
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;