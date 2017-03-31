import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import ProfileForm from '../components/ProfileForm.jsx';


class ProfilePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const name = localStorage.getItem('userProfileName');
    const email = localStorage.getItem('userProfileEmail')

    // set the initial component state
    this.state = {
      errors: {
        name: '',
        new_password: '',
        confir_new_password: '',
        email: '',
        password: ''
      },
      user: {
        name: name,
        new_password: '',
        confir_new_password: '',
        email: email,
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
    const name  = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const new_password = encodeURIComponent(this.state.user.new_password);
    const confir_new_password = encodeURIComponent(this.state.user.confir_new_password);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/changeProfile');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a user profile items
        localStorage.setItem('userProfileName', xhr.response.user.name);
        localStorage.setItem('userProfileEmail', xhr.response.user.email);

         // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        //Cerramos sesion para iniciar con los nuevos datos
        Auth.deauthenticateUser();

        // change the current URL to /
        this.context.router.replace('/login');

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
    if(this.state.user.new_password === this.state.user.confir_new_password
      && this.state.user.new_password.length > 8 
      && this.state.user.new_password.length < 15 
      && this.state.user.confir_new_password.length > 8 
      && this.state.user.confir_new_password.length < 15
      || (this.state.user.new_password.length==0 && this.state.user.confir_new_password.length == 0)){
      this.state.errors.new_password="success";
      this.state.errors.confir_new_password="success";
    }
    else{
      this.state.errors.new_password="error";
      this.state.errors.confir_new_password="error";
    }

    if(this.state.user.password.length < 8 || this.state.user.password.length > 15 || this.state.user.password.length== 0 )
      this.state.errors.password="error";
    else
      this.state.errors.password="success"

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
      <ProfileForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ProfilePage;