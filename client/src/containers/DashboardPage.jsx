import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import toastr from 'toastr';


class DashboardPage extends Component {

  /**
   * Clase constructora.
   */
  constructor(props) {
    super(props);
    //Configuración global de las notificaciones toast
    toastr.options={
      "closeButton": true, //Dispondrán de un botón para cerrarlas
      "preventDuplicates": true, //Para prevenir que aparezcan toast duplicados
      "newestOnTop": true //Los nuevos aparecerán encima
    }
    //Obtenemos el nombre y el email almacenados de forma local
    const name = localStorage.getItem('userProfileName');
    const email = localStorage.getItem('userProfileEmail');

    // Cambiamos el estado
    this.state = {
      secretData: name + ' (' + email + ') is autorizated to see this page'
   };
    //Mostramos un toast con el mensaje secreto
    {this.state.secretData && toastr.success(this.state.secretData) }
  }
  /**
   * Instanciamos un componente de tipo Dashboard.
   */
  render() {
    return (<Dashboard/>);
  }

}

export default DashboardPage;