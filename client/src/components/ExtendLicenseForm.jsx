import React from 'react';
import {Form, FormControl, FormGroup, Col, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import PropTypes  from 'prop-types';
/* Componente ExtendLicenseForm encargado de crear el formulario para la creación de un usuario.
Recibirá los siguientes parámetros:
  1) onSubmit: Función llamada al presionar el boton 'submit' del formulario.
  2) onChange: Función encargada de manejar los cambios en los campos de entrada de texto del formulario.
  4) license: Objeto donde se almacenará el usuario a crear.
  5) organizations: Lista de las organizaciones disponibles.
*/

const ExtendLicenseForm = ({
  onSubmit,
  onChange,
  license
}) => 
  (<div>
    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Extend license </h2>
      <br></br>
    </div>
    <Form horizontal onSubmit={onSubmit}>
      <FormGroup controlId="duration">
        <Col componentClass={ControlLabel} sm={2}>
          Extend for
        </Col>
        <Col sm={10}>
          <FormControl name="duration" componentClass="select" onChange={onChange}>
            <option value={1} key={"1"} > 1 month</option>
            <option value={3} key={"2"}> 3 months</option>
            <option value={6} key={"3"}> 6 months</option>
            <option value={12} key={"4"}> 1 year</option>
          </FormControl>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Extend license
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

//Haciendo uso de propTypes comprobamos si todos los parámetros son recibidos por el componente y en el formato correcto
ExtendLicenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  license: PropTypes.object.isRequired
};

export default ExtendLicenseForm;
