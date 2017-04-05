import React, { PropTypes } from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';

const NewPasswordForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div>
    {errors.summary && 
            <Panel header="Error message" bsStyle="danger">
              {errors.summary}
            </Panel>
    }
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

NewPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default NewPasswordForm;
