import React, { PropTypes } from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import { Link } from 'react-router';


const CreateOrgForm = ({
  onSubmit,
  onChange,
  errors,
  org,
  successMessage
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

CreateOrgForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  org: PropTypes.object.isRequired
};

export default CreateOrgForm;
