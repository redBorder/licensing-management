import React from 'react';
import {Form, FormControl, FormGroup, Col, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import PropTypes  from 'prop-types';
/* Componente CreateLicenseForm encargado de crear el formulario para la creación de un usuario.
Recibirá los siguientes parámetros:
  1) onSubmit: Función llamada al presionar el boton 'submit' del formulario.
  2) onChange: Función encargada de manejar los cambios en los campos de entrada de texto del formulario.
  3) errors: Objeto utilizado para la validación visual del formulario. 
  4) license: Objeto donde se almacenará el usuario a crear.
  5) organizations: Lista de las organizaciones disponibles.
*/

//EN UN FUTURO HAY QUE HACER QUE SE COMPRUEBE CUANTOS SENSORES HAY PARA ESTA ORGANIZACIÓN DEFINIDOS
const CreateLicenseForm = ({
  onSubmit,
  onChange,
  onChangeSensors,
  errors,
  license,
  sensors
}) => 
  (<div>
    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Create license form </h2>
      <br></br>
    </div>
    <Form horizontal onSubmit={onSubmit}>
      <FormGroup controlId="expires_at" validationState={errors.expires_at=="" ? null : errors.expires_at} >
        <Col componentClass={ControlLabel} sm={2}>
          Expires date
        </Col>
        <Col sm={10}>
          <FormControl name="expires_at" componentClass="select" onChange={onChange}>
            <option value={1} key={"1"} > 1 month</option>
            <option value={3} key={"2"}> 3 months</option>
            <option value={6} key={"3"}> 6 months</option>
            <option value={12} key={"4"}> 1 year</option>
          </FormControl>
        </Col>
      </FormGroup>

      <FormGroup controlId="limit_bytes" validationState={errors.limit_bytes=="" ? null : errors.limit_bytes}>
        <Col componentClass={ControlLabel} sm={2}>
          Limit bytes
        </Col>
        <Col sm={10}>
          <FormControl name="limit_bytes"  componentClass="select" onChange={onChange} value={license.limit_bytes}>
            {
              [...Array(10000).keys()].map((i) => {
                return <option value={i} key={i}>{i + " bytes"}</option>
              })
            }
          </FormControl>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      {
      sensors.map(function(sensor,key){
        
        return (<div key={key}>
          <FormGroup controlId={sensor} validationState={errors.sensors[sensor]=="" ? null : errors.sensors[sensor]}>
            <Col componentClass={ControlLabel} sm={2}>
              Sensors {sensor}
            </Col>
            <Col sm={10}>
              <FormControl name={sensor}  componentClass="select" onChange={onChangeSensors} value={license[sensor]}>
                {
                  [...Array(300).keys()].map((i) => {
                    return <option value={i} key={i}> {i}</option>
                  })
                }
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          </div>)
      })
      }

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Create license
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

//Haciendo uso de propTypes comprobamos si todos los parámetros son recibidos por el componente y en el formato correcto
CreateLicenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSensors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  license: PropTypes.object.isRequired,
  sensors: PropTypes.array.isRequired
};

export default CreateLicenseForm;
