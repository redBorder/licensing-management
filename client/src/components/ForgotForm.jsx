import React from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import PropTypes  from 'prop-types';
/*
Componente encargado de crear el formulario para el recordatorio de contraseña de usuario
Recibirá los siguientes parámetros:
  1) onSubmit: Función llamada al presionar el boton 'submit' del formulario.
  2) onChange: Función encargada de manejar los cambios en los campos de entrad de texto del formulario.
  3) errors: Objeto utilizado para la validación visual del formulario. 
  4) user: Objeto con la información del usuario que solicita el recordatorio de contraseña.
*/
const ForgotForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div>

    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Forgot password </h2>
      <br></br>
    </div>
    <Form horizontal onSubmit={onSubmit}>

      <FormGroup controlId="email" validationState={errors.email=="" ? null : errors.email} >
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl name ="email" type="email" placeholder="Email" required="true" onChange={onChange} value={user.email}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Remember me
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);
//Utilizando propTypes verificamos que el componente recibe todos los parámetros de forma correcta
ForgotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default ForgotForm;
