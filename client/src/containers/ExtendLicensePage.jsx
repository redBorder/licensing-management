import React, { Component } from 'react';
import Auth from '../modules/Auth';
import ExtendLicenseForm from '../components/ExtendLicenseForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class ExtendLicensePage extends Component {

  /**
   * Clase constructora.
   */
  constructor(props, context) {
    super(props, context);
    //Configuración global de las notificaciones toast
    toastr.options={
      "closeButton": true, //Dispondrán de un botón para cerrarlas
      "preventDuplicates": true, //Para prevenir que aparezcan toast duplicados
      "newestOnTop": true //Los nuevos aparecerán encima
    }
    // Configuramos los estados iniciales
    this.state = {
      license: {
        expires_at: '',
        limit_bytes: '',
        sensors: {
        },
        OrganizationId: '',
        UserId: ''
      },
      month_extend: '1' //Inicialmente modificamos solo un mes
    };

    this.changeExpiresTime = this.changeExpiresTime.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  //Justo antes de renderizar el componente se llamará a este método
  componentWillMount(){
    //Utilizando ajax, pedimos los tipos de sensores disponibles para la organización que queremos crear
    const xhr = new XMLHttpRequest();
    //Abrimos una conexión get
    xhr.open('get', '/api/licenses/extend?LicenseId=' + this.props.params.LicenseId ); 
    // Configuramos el token para la autorización
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // La respuesta se espera que sea un JSON
    xhr.responseType = 'json';
    // Añadimos el callback para cuando se reciba la respuesta de forma correcta
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // En caso de éxito
        // Cambiamos el estado, eliminando los errores y almancenando la licencia
        this.setState({
          error: "",
          license: xhr.response.license
        });

      } else {
        // En caso de fallo, mediante un toast informamos del mensaje de error
      
        }
    });
    //Enviamos la petición
    xhr.send();
  }

  /**
   * Función encargada de enviar el formulario
   *
   * @parametros {objeto} event - Objeto event de JavaScript
   */
  processForm(event) {
    //Prevenimos el envío del formulario vacío y por defecto
    event.preventDefault();
    //Justo antes de enviar los datos le sumamos a la fecha de expiracion los meses añadidos. Si la licencia a expirado, le sumamos la ampliación a partir del día de hoy
    const new_expires = new Date(this.state.license.expires_at) < new Date() ? new Date() : new Date(this.state.license.expires_at);
    new_expires.setMonth(new_expires.getMonth() + parseInt(this.state.month_extend));
    //Creamos una cadena de carácteres par enviar en el método post todos los parámetros (aunque solo cambia la fecha de expiración)
    const expires_at = encodeURIComponent(new_expires);
    const license_uuid = encodeURIComponent(this.state.license.license_uuid);
    const limit_bytes = encodeURIComponent(this.state.license.limit_bytes);
    const OrganizationId = encodeURIComponent(this.state.license.OrganizationId);
    const UserId = encodeURIComponent(this.state.license.UserId);
    const sensors = JSON.stringify(this.state.license.sensors);
    const formData = `license_uuid=${license_uuid}&sensors=${sensors}&expires_at=${expires_at}&UserId=${UserId}&limit_bytes=${limit_bytes}&OrganizationId=${OrganizationId}`;

    //Creación de la petición AJAX para la creación de un usuario
    const xhr = new XMLHttpRequest();
    //Abrimos la conexión post con el servidor
    xhr.open('post', '/api/licenses' );
    //Modificamos la cabecera para indicar que será el envío de un formulario
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //Configuramos el token que identifica al usuario que está realizando la petición
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    //Esperaremos una respuesta JSON
    xhr.responseType = 'json';
    //Función que se ejecutará al recibir la respuesta
   xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // Si se ha recibido un 200 ok, notificamos con un mensaje que se ha creado correctamente el usuario
        {xhr.response.message && toastr.success(xhr.response.message)} //Contendrá el mensaje recibido

      } else {
        // En caso de fallo mostramos el mensaje de error recibido del servidor
        {xhr.response.message && toastr.error(xhr.response.message)}
      }
    });
    //Enviamos la petición 
    xhr.send(formData);
  }

  changeExpiresTime(event){
    // Obtenemos el valor actual del usuario almacenado en el estado
    const license = this.state.license;
    //modificamos el campo de expiración
    if(event.target.name=="expires_at"){
      //Manejamos la fecha para sumarle el numero de meses recibido
      this.setState({
        month_extend:event.target.value
      });
    } //En caso contrario no hacemos nada
  }

  /**
   * Instanciamos un componente de tipo ExtendLicenseForm al que se le pasan los parámetros correctos
   * definidos en el contendor ExtendLicensePage
   */
  render() {
    return (
      <ExtendLicenseForm
        onSubmit={this.processForm}
        onChange={this.changeExpiresTime}
        license={this.state.license}
      />
    );
  }

}
//Comprobamos que se está haciendo uso de react-router
ExtendLicensePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ExtendLicensePage;