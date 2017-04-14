import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import CreateOrgForm from '../components/CreateOrgForm.jsx';


class CreateOrgPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {
        email: '',
        name: ''
      },
      org: {
        email: '',
        name: ''
      },
      successMessage: ''
    }

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
    const name = encodeURIComponent(this.state.org.name);
    const email = encodeURIComponent(this.state.org.email);
    const formData = `name=${name}&email=${email}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/createOrg');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {},
          successMessage: xhr.response.message
        });

      } else {
        // failure

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
   * Change the org object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
      const org = this.state.org;
    if(field!="role")
    { 
      org[field] = event.target.value;
      
    }else{
      org.admin = !org.admin;
    }
    this.setState({
        org
      });
    //Esto es para validar el formulario visualmente, solo para el usuario

    if(this.state.org.name.length!=0)
      this.state.errors.name="success";
    else
      this.state.errors.name="error"

    if(this.state.org.email.length!=0)
      this.state.errors.email="success";
    else
      this.state.errors.email="error"
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <CreateOrgForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        org={this.state.org}
        successMessage={this.state.successMessage}
      />
    );
  }

}

CreateOrgPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateOrgPage;