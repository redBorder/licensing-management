import React from 'react';
import Auth from '../modules/Auth';
import NewPasswordForm from '../components/NewPasswordForm.jsx';
import PropTypes  from 'prop-types';


class NewPasswordPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {
        password: '',
        confir_password: ''
      },
      user: {
        password: '',
        confir_password: ''
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
    
    //No entiendo por qué hay que poner esto si esto es el default, no? Lo he puesto para evitarlo por fuerza

        // create a string for an HTTP body message
    const confir_password = encodeURIComponent(this.state.user.confir_password);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `password=${password}&confir_password=${confir_password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    //El token se le pasa como parametros al usar react-router para pasar parametros
    xhr.open('post', '/auth/reset/' + this.props.params.token ); 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        //Almacenamos el mensaje para mostrarlo en la pagina principal despues
        localStorage.setItem('successMessage', xhr.response.message);

        // change the current URL to /
        this.context.router.replace('/');
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
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <NewPasswordForm

        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}
NewPasswordPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NewPasswordPage;