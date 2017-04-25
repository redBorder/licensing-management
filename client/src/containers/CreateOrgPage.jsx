import React, { Component } from 'react';
import Auth from '../modules/Auth';
import CreateOrgForm from '../components/CreateOrgForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class CreateOrgPage extends Component {

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
    // Configuramos los valores iniciales para los estados
    this.state = {
      //inicialmente no hay errores
      errors: {
        name:'',
        email:'',
        cluster_id:''
      },
      //Inicialmente no existe ninguna organización
      org: {
        email: '',
        name: '',
        cluster_id: '',
      }
    }
    //Utilización de bind para poder llamar a estas funciones dentro de la propia clase CreateOrgPage 
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Función encargada de enviar el formulario
   *
   * @parametros {objeto} event - Objeto event de JavaScript
   */
  processForm(event) {
    // Prevenimos el envío del formulario vacío
    event.preventDefault();
    // Creamos una cadena con los valores a enviar en el método post. Se codificaran para que se puedan enviar carácteres especiales(como ñ, espacios, @...)
    const cluster_id = encodeURIComponent(this.state.org.cluster_id);
    const name = encodeURIComponent(this.state.org.name);
    const email = encodeURIComponent(this.state.org.email);
    const formData = `name=${name}&email=${email}&cluster_id=${cluster_id}`;

    // Creación de la peticion AJAX correspondiente a la creación de una organización
    const xhr = new XMLHttpRequest();
    //Abrimos una conexión post
    xhr.open('post', '/api/organizations');
    //Configuramos la cabecera (content-type) para indicar que es una petición de tipo formulario
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // Configuramos el toquen en la cabecera de la petición
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // Esperamos un JSON como respuesta a la petición
    xhr.responseType = 'json';
    // Añadimos el callBack que se ejecutará cuando recibamos la respuesta
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // En caso de éxito
        this.setState({
          errors:{} //Eliminamos los posibles errores que hubiera en el estado almacenado 
        });
        /*
          Lanzamos una notificación mediante un toast para notificar que se ha creado una organización con éxito.
          Este toast mostrará el mensaje recibido en la respuesta
        */
        {xhr.response.message && toastr.success(xhr.response.message)}

      } else {
        /*
          En caso de fallo  
          Lanzamos una notificación mediante un toast para notificar que no se ha podido crear la organización.
          Este toast mostrará el mensaje recibido en la respuesta
        */
        {xhr.response.message && toastr.error(xhr.response.message)}
      }
    });
    xhr.send(formData);
  }

  /**
   * Funcion encargada del cambio de algún campo del formulario y en el objeto 'org' del estado.
   *
   * @parametros {objeto} event - Objeto event de JavaScript
   */
  changeUser(event) {
    //El objeto de la organización a cambiar será el nombre del campo del formulario que se está cambiando
    const field = event.target.name;
    const org = this.state.org;
    org[field] = event.target.value;
    //Cambiamos el estado
    this.setState({
        org
      });

    //Esto se utiliza para la validación visual del formulario en la interfaz gráfica
    if(this.state.org.name.length!=0) //El campo name no puede estar vacío
      this.state.errors.name="success";
    else
      this.state.errors.name="error"

    if(this.state.org.cluster_id.length!=0) //El campo cluster_id no puede estar vacío
      this.state.errors.cluster_id="success";
    else
      this.state.errors.cluster_id="error"

    if(this.state.org.email.length!=0) //El campo email no puede estar vacío
      this.state.errors.email="success";
    else
      this.state.errors.email="error"
  }

  /**
   * Instanciamos un componente CreateOrgForm al que se le pasarán las referencias a
   * las funciones que manejan el envío y cambio del formulario y los objetos 'errors' y 'org'.
   */
  render() {
    return (
      <CreateOrgForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        org={this.state.org}
        />
    );
  }
}

//Verificamos que está el contexto de react-router 
CreateOrgPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateOrgPage;