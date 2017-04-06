import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class RemoveUserPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: ''
   };
  }
  //Se llamará justo ants de renderizar el componente
  componentWillMount(){
     //Utilizando ajax, en el constructor pedimos la lista de usuarios registrados
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/removeUser/' + this.props.params.id);
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log("borrado")
        // success
        // change the component-container state
        this.setState({
          error: "",
          message: xhr.response.message
        });


      } else {
        // failure
        console.log("no borrado")
        // change the component state
        error = xhr.response.message;

        this.setState({
          error
        });
        }
    });
    xhr.send();
  }
  /**
   * Render the component.
   */
  render() {
    return (<Dashboard successMessage={this.state.message} errorMessage={this.state.error}/>);
  }

}

export default RemoveUserPage;