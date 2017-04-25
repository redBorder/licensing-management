import React from 'react';
import {Form, FormControl, FormGroup, Col, ControlLabel, Button, FeedBack} from 'react-bootstrap';
import PropTypes  from 'prop-types';

/* Componente NewPasswordForm encargado de crear el formulario para la creación de una nueva contraseña olvidada.
Recibirá los siguientes parámetros:
  1) onSubmit: Función llamada al presionar el boton 'submit' del formulario.
  2) onChange: Función encargada de manejar los cambios en los campos de entrada de texto del formulario.
  3) errors: Objeto utilizado para la validación visual del formulario. 
  4) user: Objeto que contendrá el usuario con la nueva contraseña
*/
const NewPasswordForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div>
    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> New password form </h2>
      <br></br>
    </div>
    <Form horizontal onSubmit={onSubmit}>
      <FormGroup controlId="password" validationState={errors.password=="" ? null : errors.password}>
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl name="password" type="password" placeholder="Password" onChange={onChange} value={user.password}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      <FormGroup controlId="confir_password" validationState={errors.confir_password=="" ? null : errors.confir_password}>
        <Col componentClass={ControlLabel} sm={2}>
          Confirm Password
        </Col>
        <Col sm={10}>
          <FormControl name="confir_password" type="password" placeholder="Confirm Password" onChange={onChange} value={user.confir_password}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Change Password
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

//Haciendo uso de propTypes se comprueban que todos los parámetros son recibidos correctamente
NewPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default NewPasswordForm;
