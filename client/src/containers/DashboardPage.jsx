import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends Component {

  /**
   * Clase constructora.
   */
  constructor(props) {
    super(props);
    //Obtenemos el nombre y el email almacenados de forma local
    const name = localStorage.getItem('userProfileName');
    const email = localStorage.getItem('userProfileEmail');
  }
  /**
   * Instanciamos un componente de tipo Dashboard.
   */
  render() {
    return (<Dashboard/>);
  }

}

export default DashboardPage;