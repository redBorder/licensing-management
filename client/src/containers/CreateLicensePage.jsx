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
    //Por defecto, la fecha de expiración es un mes para las licencias nuevas
    const intialDate = new Date();
    intialDate.setMonth(intialDate.getMonth() + 1);
    // Configuramos los estados iniciales
    this.state = {
      errors: {
        expires_at: '',
        limit_bytes: '',
         sensors: {
        }
      },
      license: {
        expires_at: intialDate,
        limit_bytes: '0',
        sensors: {
        },
        OrganizationId: this.props.params.OrgId,
        UserId: this.props.params.UserId
      },
      sensors: ''
    };

    this.changeSensors = this.changeSensors.bind(this);
    this.processForm = this.processForm.bind(this);
    this.changeLicense = this.changeLicense.bind(this);
  }

  //Justo antes de renderizar el componente se llamará a este método
  componentWillMount(){
    //Utilizando ajax, pedimos los tipos de sensores disponibles para la organización que queremos crear
    const xhr = new XMLHttpRequest();
    //Abrimos una conexión get
    xhr.open('get', '/api/licenses/new?OrganizationId=' + this.props.params.OrgId); 
    // Configuramos el token para la autorización
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // La respuesta se espera que sea un JSON
    xhr.responseType = 'json';
    // Añadimos el callback para cuando se reciba la respuesta de forma correcta
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // En caso de éxito 
        // Cambiamos el estado, eliminando los errores y almancenando las organizaciones
        //Una vez sabemos qué sensores hay, configuramos sus valores iniciales a 0
        xhr.response.sensors.split(';').map(sensor => {
          this.state.license.sensors[sensor] = '0';
        });
        this.setState({
          error: "",
          sensors: xhr.response.sensors,
        });
      } else {
        // En caso de fallo, mediante un toast informamos del mensaje de error
          {xhr.response.message && toastr.error(xhr.response.message)}
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
        // Cambiamos los valores de los errores en el estado del componente para indicar que no hay errores
        this.setState({
          errors: {
            expires_at: '',
            limit_bytes: '',
            sensors: {
            }
          }
        });
        //Redirigimos al inicio
        this.context.router.replace('/');
      } else {
        // En caso de fallo mostramos el mensaje de error recibido del servidor
        {xhr.response.message && toastr.error(xhr.response.message)}
      }
    });
    //Enviamos la petición 
    xhr.send(formData);
  }

  changeSensors(event){
    // Obtenemos el valor actual del usuario almacenado en el estado
    const license = this.state.license;
    
    license.sensors[event.target.name] = event.target.value;
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
    const field = event.target.name;
    if(event.target.name=="expires_at"){
      //Manejamos la fecha para sumarle el numero de dias recibido
      const newDate = new Date();
      newDate.setMonth(newDate.getMonth() + parseInt(event.target.value, 10));
      license.expires_at=newDate;
    }
    else{
      license[field] = event.target.value;
    }
      //finalmente almacenamos el nuevo estado del usuario
    this.setState({
        license
      });
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
        onChangeSensors={this.changeSensors}
        errors={this.state.errors}
        license={this.state.license}
        sensors={this.state.sensors.split(';')}
      />
    );
  }

}
//Comprobamos que se está haciendo uso de react-router
CreateLicensePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateLicensePage;