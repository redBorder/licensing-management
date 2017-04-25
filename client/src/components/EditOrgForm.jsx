import React from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes  from 'prop-types';

const EditOrgForm = ({
  onSubmit,
  onChange,
  errors,
  organization
}) => (
  <div>
    <div className="row">
      <h2 className="text-center" style={{color:"blue"}}> Edit organization form </h2>
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

EditOrgForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired
};

export default EditOrgForm;
