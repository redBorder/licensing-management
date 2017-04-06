import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import EditUserForm from '../components/EditUserForm.jsx';


class EditUserPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {
        name: '',
        email: ''
      },
      user: {
        name: decodeURIComponent(this.props.params.name),
        email: decodeURIComponent(this.props.params.email),
        organization: '',
        admin: false
      },
      successMessage: '',
      organizations: [
      {
        name: "org1",
        id: "1"
      },
      {
        name: "org2",
        id: "2"
      },
      {
        name: "org3",
        id: "3"
      },
      ]
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
    const name  = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const role = this.state.user.admin ? "admin" : "normal";
    const organization = this.state.user.organization;
    const formData = `email=${email}&name=${name}&role=${role}&organization=${organization}`;
    console.log("Send form" + formData);
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/editUsersAdmin/' + this.props.params.id);
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
          successMessage: xhr.response.message,
          user: xhr.response.user
        });
      } else {
        // failure
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

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
        successMessage={this.state.successMessage}
      />
    );
  }

}

EditUserPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditUserPage;