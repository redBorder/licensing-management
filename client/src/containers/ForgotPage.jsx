import React from 'react';
import Auth from '../modules/Auth';
import ForgotForm from '../components/ForgotForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';

class ForgotPage extends React.Component {

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
      },
      user: {
        email: '',
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
    const formData = `email=${email}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/forgot');
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
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <ForgotForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

ForgotPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ForgotPage;