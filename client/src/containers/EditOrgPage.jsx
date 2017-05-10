import React, { Component } from 'react';
import Auth from '../modules/Auth';
import EditOrgForm from '../components/EditOrgForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class EditOrgPage extends Component {

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
    //Configuramos el estado inicial
    this.state = {
      errors: {
        name: '',
        email: '',
        cluster_id: ''
      },
      organization: {
        name: '',
        email: '',
        cluster_id: '' 
      }
    };
    //Se hace uso de 'bind' para poder llamar a estas funciones desde la propia clase EdtiOrgPage
    this.processForm = this.processForm.bind(this);
    this.changeOrg = this.changeOrg.bind(this);
  }

   //Justo antes de renderizar el componente se llama a este método
  componentWillMount(){
    //Utilizando ajax, pedimos los valores de la organización a editar
    //Creamos la petición AJAX
    const xhr = new XMLHttpRequest();
    //Abrimos una conexión get que realizará una peticion a la url /api/organizations/:idOrg/edit
    xhr.open('get', '/api/organizations/' + this.props.params.id + "/edit"); 
    //Configuramos el token para identificar al usuario que realizará la petición
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    //La respuesta esperada será un JSON
    xhr.responseType = 'json';
    //Configuramos la función que se ejecutará al recibir la respuesta
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // En caso de éxito
        // Cambiamos el estado
        this.setState({
          error: "", //Eliminamos los posibles errores que existesen
          organization: { //Configuramos los datos de la organización a editar
            name: xhr.response.org.name,
            email: xhr.response.org.email,
            cluster_id: xhr.response.org.cluster_id 
          }
       });
      } else {
        // En caso de error
        // Cambiamos el componente de error
        error = xhr.response.message;
        //mostramos el mensaje recibido con un toast de error
        {error && toastr.success(error)}
        this.setState({
          error
        });
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
    // Prevenimos el envío del formulario vacío o con datos por defecto
    event.preventDefault();

    // Creamos la cadena a enviar en el método post con los datos de la organización introducidos en el formulario
    const name  = encodeURIComponent(this.state.organization.name);
    const email = encodeURIComponent(this.state.organization.email);
    const cluster_id = encodeURIComponent(this.state.organization.cluster_id);
    const formData = `email=${email}&name=${name}&cluster_id=${cluster_id}`;
    // Creamos la petición AJAX
    const xhr = new XMLHttpRequest();
    //Abrimos una petición PUT para editar una organización
    xhr.open('put', '/api/organizations/' + this.props.params.id);
    //Configuramos la cabecera para indicar que estamos procesando un formulario
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //Configuramos el toknen para identificar al usuario que realizará la petición
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    //Esperaremos un JSON de respuesta a la petición
    xhr.responseType = 'json';
    //Añadimos la función que se ejecutará al recibir la respuesta
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // En caso de éxito, mostramos un mensaje de éxito con la respuesta recibida del servidor
        {xhr.response.message && toastr.success(xhr.response.message)}
        // Cambiamos el estado del componente
        this.setState({
          errors: {},
          organization: xhr.response.org
        });
        //Redirigimos al inicio
        this.context.router.replace('/');
      } else {
        // En caso de error
        // Cambiamos el estado del componente
        const errors = xhr.response.errors ? xhr.response.errors : {};
        // Notificamos con un toast de error el mensaje recibido del servidor
        {xhr.response.message && toastr.error(xhr.response.message)}
        //Modificamos el estado del componente
        this.setState({
          successMessage:"",
          errors
        });
      }
    });
    //Enviamos el formulario al servidor
    xhr.send(formData);
  }

  /**
   * Funcion encargada del cambio de algún campo del formulario y en el objeto 'user' del estado.
   *
   * @parametros {objeto} event - Objeto event de JavaScript
   */
  changeOrg(event) {
    //Obtenemos el nombre del campo que va a cambiar
    const field = event.target.name;
    //Obtenemos el valor actual de la organización
    const organization = this.state.organization;
    //Cambiamos el valor del campo por el nuevo valor
    organization[field] = event.target.value;
    //Cambiamos el estado en el componente
    this.setState({
        organization
      });
  
    
    //Esto es para validar el formulario visualmente, solo para el usuario
    //El nombre no puede estar vacío
    if(this.state.organization.name.length!=0)
      this.state.errors.name="success";
    else
      this.state.errors.name="error"

    //El identificador del cluster no puede estar vacío
    if(this.state.organization.cluster_id.length!=0)
      this.state.errors.cluster_id="success";
    else
      this.state.errors.cluster_id="error"

    //El email no puede estar vacío
    if(this.state.organization.email.length!=0)
      this.state.errors.email="success";
    else
      this.state.errors.email="error"

    
  }

  /**
   * Instanciamos un componente de tipo EditOrgForm, pasándole los parámetros correctos definidos en el componente EditOrgPage
   */
  render() {
    return (
      <EditOrgForm
        onSubmit={this.processForm}
        onChange={this.changeOrg}
        errors={this.state.errors}
        organization={this.state.organization}
      />
    );
  }

}

//Nos aseguramos que estamos usando react-router
EditOrgPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditOrgPage;