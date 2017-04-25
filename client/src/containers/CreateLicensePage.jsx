import React, { Component } from 'react';
import Auth from '../modules/Auth';
import CreateLicenseForm from '../components/CreateLicenseForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class CreateLicensePage extends Component {

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
      errors: {
        expires_at: '',
        limit_bytes: '',
         sensors: {
          IPS: '',
          Flow: '',
          Social: ''
        }
      },
      license: {
        expires_at: '',
        limit_bytes: '',
        sensors: {
          IPS: '',
          Flow: '',
          Social: ''
        },
        OrganizationId: this.props.params.OrgId,
        UserId: this.props.params.UserId
      }
    };

    this.changeDate = this.changeDate.bind(this);
    this.processForm = this.processForm.bind(this);
    this.changeLicense = this.changeLicense.bind(this);
  }

  /**
   * Función encargada de enviar el formulario
   *
   * @parametros {objeto} event - Objeto event de JavaScript
   */
  processForm(event) {
    //Prevenimos el envío del formulario vacío y por defecto
    event.preventDefault();
    //Creamos una cadena de carácteres par enviar en el método post los parámetros introducidos en el formulario
    const expires_at = encodeURIComponent(this.state.license.expires_at);
    const limit_bytes = encodeURIComponent(this.state.license.limit_bytes);
    const OrganizationId = encodeURIComponent(this.state.license.OrganizationId);
    const UserId = encodeURIComponent(this.state.license.UserId);
    const sensors = JSON.stringify(this.state.license.sensors);
    const formData = `sensors=${sensors}&expires_at=${expires_at}&UserId=${UserId}&limit_bytes=${limit_bytes}&OrganizationId=${OrganizationId}`;

    //Creación de la petición AJAX para la creación de un usuario
    const xhr = new XMLHttpRequest();
    //Abrimos la conexión post con el servidor
    xhr.open('post', '/api/license' );
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
        // Cambiamos los valores de los errores en el estado del componente para indicar que no hay errores
        this.setState({
          errors: {
            expires_at: '',
            limit_bytes: '',
             sensors: {
              IPS: '',
              Flow: '',
              Social: ''
            }
          }
        });

      } else {
        // En caso de fallo mostramos el mensaje de error recibido del servidor
        {xhr.response.message && toastr.error(xhr.response.message)}
      }
    });
    //Enviamos la petición 
    xhr.send(formData);

  }

  changeDate(date){
    // Obtenemos el valor actual del usuario almacenado en el estado
    const license = this.state.license;
    
    license.expires_at = date;
    this.setState({
      license
    })

  }
  /**
   * Funcion encargada del cambio de algún campo del formulario y en el objeto 'user' del estado.
   *
   * @parametros {objeto} event - Objeto event de JavaScript
   */
  changeLicense(event) {

    // Obtenemos el valor actual del usuario almacenado en el estado
    const license = this.state.license;
    if(event.target.name=="limit_bytes"){
      // Tomamos nombre del campo del formulario que se está editando
      const field = event.target.name;
      license[field] = event.target.value;
      //finalmente almacenamos el nuevo estado del usuario
    }
    else {//sensores
      license.sensors[event.target.name]= event.target.value;
        // Los campos de los sensores no pueden estar vacío
      if(this.state.license.sensors[event.target.name].length!=0)
        this.state.errors.sensors[event.target.name]="success";
      else
        this.state.errors.sensors[event.target.name]="error"
    }
    this.setState({
        license
      });


    //Esto es para validar el formulario visualmente, solo para el usuario

    // El campo limit bytes no puede estar vacío
    if(this.state.license.limit_bytes.length!=0)
      this.state.errors.limit_bytes="success";
    else
      this.state.errors.limit_bytes="error"

    

  }

  /**
   * Instanciamos un componente de tipo CreateLicenseForm al que se le pasan los parámetros correctos
   * definidos en el contendor CreateLicensePage
   */
  render() {
    return (
      <CreateLicenseForm
        onSubmit={this.processForm}
        onChange={this.changeLicense}
        onChangeDate={this.changeDate}
        errors={this.state.errors}
        license={this.state.license}
      />
    );
  }

}
//Comprobamos que se está haciendo uso de react-router
CreateLicensePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateLicensePage;