import React, { Component } from 'react';
import Auth from '../modules/Auth';
import CreateUserForm from '../components/CreateUserForm.jsx';
import PropTypes  from 'prop-types';
import toastr from 'toastr';


class CreateUserPage extends Component {

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
        email: '',
        password: '',
        organization: '',
        confir_password: '',
        name: ''
      },
      user: {
        email: '',
        password: '',
        organization: '',
        confir_password: '',
        name: '', 
        admin: false //Inicialmente el usuario no será administrador
      },
      organizations: []
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  //Justo antes de renderizar el componente se llamará a este método
  componentWillMount(){
    //Utilizando ajax, pedimos la lista de todas las organizaciones registradas
    const xhr = new XMLHttpRequest();
    //Abrimos una conexión get
    xhr.open('get', '/api/users/new'); 
    // Configuramos el token para la autorización
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // La respuesta se espera que sea un JSON
    xhr.responseType = 'json';
    // Añadimos el callback para cuando se reciba la respuesta de forma correcta
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // En caso de éxito 
        // Cambiamos el estado, eliminando los errores y almancenando las organizaciones
        this.setState({
          error: "",
          organizations: xhr.response.orgs
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
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const confir_password = encodeURIComponent(this.state.user.confir_password);
    const organization = encodeURIComponent(this.state.user.organization);
    const role = this.state.user.admin ? "admin" : "normal";
    const formData = `role=${role}&name=${name}&organization=${organization}&email=${email}&password=${password}&confir_password=${confir_password}`;

    //Creación de la petición AJAX para la creación de un usuario
    const xhr = new XMLHttpRequest();
    //Abrimos la conexión post con el servidor
    xhr.open('post', '/api/users');
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
          errors: {}
        });

      } else {
        // En caso de fallo mostramos el mensaje de error recibido del servidor
        {xhr.response.message && toastr.error(xhr.response.message)}
        // Cambiamos los errores por los errores recibidos
        const errors = xhr.response.errors ? xhr.response.errors : {};
        // El mensaje de respuesta recibido será un resumen de los errores que se han producido
        errors.summary = xhr.response.message;
        // Cambiamos el estado de los errores
        this.setState({
          errors
        });
      }
    });
    //Enviamos la petición 
    xhr.send(formData);

  }

  /**
   * Funcion encargada del cambio de algún campo del formulario y en el objeto 'user' del estado.
   *
   * @parametros {objeto} event - Objeto event de JavaScript
   */
  changeUser(event) {
    // Tomamos nombre del campo del formulario que se está editando
    const field = event.target.name;
    // Obtenemos el valor actual del usuario almacenado en el estado
    const user = this.state.user;
    //Compronamos si estamos modificando el rol o no
    if(field!="role")
    { 
      //En caso de no estar modificando el rol, almacenamos el valor modificado
      user[field] = event.target.value;
      
    }else{
      //Si se ha cambiado el rol, cambiamos el valor de user.admin de true a false o viceversa
      user.admin = !user.admin;
    }
    //finalmente almacenamos el nuevo estado del usuario
    this.setState({
        user
      });

    //Esto es para validar el formulario visualmente, solo para el usuario
    if(this.state.user.password !== this.state.user.confir_password){ //La nueva contraseña y la confirmacion han de coincidir
      this.state.errors.password="error";
      this.state.errors.confir_password="error";
    }
    else{
      this.state.errors.password="success";
      this.state.errors.confir_password="success";
    }
    // El tamaño de la contraseña debe estar entre 8 y 15
    if(this.state.user.password.length < 8 || this.state.user.password.length > 15)
      this.state.errors.password="error";
    if(this.state.user.confir_password.length <8 || this.state.user.confir_password.length > 15)
      this.state.errors.confir_password="error";

    //El campo nombre no puede estar vacío
    if(this.state.user.name.length!=0)
      this.state.errors.name="success";
    else
      this.state.errors.name="error"

    //El campo email no puede estar vacío
    if(this.state.user.email.length!=0)
      this.state.errors.email="success";
    else
      this.state.errors.email="error"
  }

  /**
   * Instanciamos un componente de tipo CreateUserForm al que se le pasan los parámetros correctos
   * definidos en el contendor CreateUserPage
   */
  render() {
    return (
      <CreateUserForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        organizations={this.state.organizations}
      />
    );
  }

}
//Comprobamos que se está haciendo uso de react-router
CreateUserPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CreateUserPage;