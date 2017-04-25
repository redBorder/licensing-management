import React from 'react';
import {Form, FormControl, FormGroup, Col, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import PropTypes  from 'prop-types';
/*
Componente encargado de crear el formulario para la edición de un usuario
Recibirá los siguientes parámetros:
  1) onSubmit: Función llamada al presionar el boton 'submit' del formulario.
  2) onChange: Función encargada de manejar los cambios en los campos de entrad de texto del formulario.
  3) errors: Objeto utilizado para la validación visual del formulario. 
  4) user: Objeto con la información del usuario a editar.
  5) organizations: Lista de las organizaciones disponibles.
*/
const EditUserForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  organizations
}) => (
  <div>

    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Edit user form </h2>
      <br></br>
    </div>

    <Form horizontal onSubmit={onSubmit}>
      <FormGroup controlId="name" validationState={errors.name=="" ? null : errors.name} >
        <Col componentClass={ControlLabel} sm={2}>
          Name
        </Col>
        <Col sm={10}>
          <FormControl name ="name" type="name" placeholder="Name" onChange={onChange} value={user.name}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>

      <FormGroup controlId="email" validationState={errors.email=="" ? null : errors.email} >
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl name ="email" type="email" placeholder="Email" onChange={onChange} value={user.email}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>

      <FormGroup controlId="organization">
        <Col componentClass={ControlLabel} sm={2}>
          <ControlLabel>Organization</ControlLabel>
        </Col>
        <Col sm={10}>
          <FormControl name="organization" componentClass="select" placeholder="Select organization" onChange={onChange} value={user.organization}>

            <option value="No">No organization</option>
            {

              organizations.map((organization, key) => {
                return <option value={organization.id} key={key} > {organization.name} </option>
              })
            }
          </FormControl>
        </Col>
      </FormGroup>

      <FormGroup controlId="role">
        <Col componentClass={ControlLabel} sm={2}>
          <ControlLabel>Privileges</ControlLabel>
        </Col>
        <Col sm={10}>
            <Checkbox name="role" onChange={onChange}>
              Admin
            </Checkbox> 
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Edit user
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);
//Utilizando propTypes validamos si se reciben todos los parámetros y de forma correcta
EditUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default EditUserForm;
