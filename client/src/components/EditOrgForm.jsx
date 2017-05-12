import React from 'react';
import {Form, FormControl, FormGroup, Col, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import PropTypes  from 'prop-types';

/*
Componente encargado de crear el formulario para la edición de una organización
Recibirá los siguientes parámetros:
  1) onSubmit: Función llamada al presionar el boton 'submit' del formulario.
  2) onChange: Función encargada de manejar los cambios en los campos de entrad de texto del formulario.
  3) errors: Objeto utilizado para la validación visual del formulario. 
  4) organization: Objeto con la información de la organización a editar.
*/
const EditOrgForm = ({
  onSubmit,
  onChange,
  errors,
  organization
}) => (
  <div>

    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Edit organization </h2>
      <br></br>
    </div>
    <Form horizontal onSubmit={onSubmit}>

      <FormGroup controlId="name" validationState={errors.name=="" ? null : errors.name} >
        <Col componentClass={ControlLabel} sm={2}>
          Name
        </Col>
        <Col sm={10}>
          <FormControl name ="name" type="name" placeholder="Name" onChange={onChange} value={organization.name}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>

      <FormGroup controlId="email" validationState={errors.email=="" ? null : errors.email} >
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl name ="email" type="email" placeholder="Email" onChange={onChange} value={organization.email}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>

      <FormGroup controlId="cluster_id" validationState={errors.cluster_id=="" ? null : errors.cluster_id} >
        <Col componentClass={ControlLabel} sm={2}>
          Cluster id
        </Col>
        <Col sm={10}>
          <FormControl name ="cluster_id" type="cluster_id" placeholder="cluster_id" onChange={onChange} value={organization.cluster_id}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Edit organization
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

//Utilización de propTypes para verificar que los parámetros son recibidos y de forma correcta
EditOrgForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired
};

export default EditOrgForm;
