import React from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes  from 'prop-types';

const CreateUserForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  organizations
}) => (
  <div>
    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Create user form </h2>
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
          <FormControl name="confir_password" type="password" placeholder="Confirm password" onChange={onChange} value={user.confirm_password}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      <FormGroup controlId="organization">
        <Col componentClass={ControlLabel} sm={2}>
          <ControlLabel>Organization</ControlLabel>
        </Col>
        <Col sm={10}>
          <FormControl name="organization" componentClass="select" placeholder="Select organization" onChange={onChange} value={user.organization}>
            <option value="No Organization" key={"2"}> No organization</option>
            {
                organizations.map((organization, key) => {
                  return <option value={organization.id} key={key}> {organization.name} </option>
                })
            }
          </FormControl>
        </Col>
      </FormGroup>
      <FormGroup controlId="organization">
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
            Create User
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

CreateUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default CreateUserForm;
