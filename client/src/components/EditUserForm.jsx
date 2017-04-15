import React, { PropTypes } from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import { Link } from 'react-router';


const EditUserForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  successMessage,
  organizations
}) => (
  <div>
    {successMessage && 
      <Panel header="Success message" bsStyle="success">
        {successMessage}
      </Panel>
    }
    {errors.summary && 
            <Panel header="Error message" bsStyle="danger">
              {errors.summary}
            </Panel>
    }
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
            <option value="No Organization">No organization</option>
            {
              organizations.map((organization) => {
                return <option value={organization.id} key={organization.id} > {organization.name} </option>
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
            Edit user
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

EditUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default EditUserForm;
