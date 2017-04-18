import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import toastr from 'toastr';

class RemoveUserPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    
    toastr.options={
      "closeButton": true,
      "preventDuplicates": true,
      "newestOnTop": true
    }
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
        // success
        {xhr.response.message && toastr.success(xhr.response.message)}
      } else {
        // failure
        {xhr.response.message && toastr.error(xhr.response.message)}
        }
    });
    xhr.send();
  }
  
  /**
   * Render the component.
   */
  render() {
    return (<Dashboard/>);
  }

}

export default RemoveUserPage;