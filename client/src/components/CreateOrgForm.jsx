import React from 'react';
import { Form, FormControl, FormGroup, Col, ControlLabel, Button, FeedBack} from 'react-bootstrap';
import PropTypes  from 'prop-types';

/* Componente CreateOrgForm encargado de crear el formulario de creación de una organización
Recibirá los siguientes parámetros:
  1) onSubmit: Función llamada al presionar el boton 'submit' del formulario.
  2) onChange: Función encargada de manejar los cambios en los campos de entrada de texto del formulario.
  3) errors: Objeto utilizado para la validación visual del formulario. 
  4) org: Objeto donde se almacenará la organización a crear
*/

const CreateOrgForm = ({
  onSubmit,
  onChange,
  errors,
  org
}) => (
  <div>
    <div className="row">
    </div>

    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Create organization form </h2>
      <br></br>
    </div>
    <Form horizontal onSubmit={onSubmit}>
      <FormGroup controlId="name" validationState={errors.name=="" ? null : errors.name} >
        <Col componentClass={ControlLabel} sm={2}>
          Name
        </Col>
        <Col sm={10}>
          <FormControl name ="name" type="name" placeholder="Organization name" onChange={onChange} value={org.name}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      
      <FormGroup controlId="email" validationState={errors.email=="" ? null : errors.email} >
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl name ="email" type="email" placeholder="Organization email" onChange={onChange} value={org.email}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      
      <FormGroup controlId="cluster_id" validationState={errors.cluster_id=="" ? null : errors.cluster_id} >
        <Col componentClass={ControlLabel} sm={2}>
          Cluster id
        </Col>
        <Col sm={10}>
          <FormControl name ="cluster_id" type="name" placeholder="Cluster id" onChange={onChange} value={org.cluster_id}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>

      <FormGroup controlId="sensors" validationState={errors.cluster_id=="" ? null : errors.cluster_id} >
        <Col componentClass={ControlLabel} sm={2}>
          List sensors
        </Col>
        <Col sm={10}>
          <FormControl name ="sensors" type="name" placeholder="Sensor1;Sensor2;Sensor3..." onChange={onChange} value={org.sensors}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>


      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Create Organization
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

//Mediante propTypes se comprueba que el componente recibe correctamente todos los parámetros
CreateOrgForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired
};

export default CreateOrgForm;
