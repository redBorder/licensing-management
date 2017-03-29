import React, { PropTypes } from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';

const ForgotForm = ({
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
      <FormGroup controlId="email" validationState={errors.email=="" ? null : errors.email} >
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl name ="email" type="email" placeholder="Email" onChange={onChange} value={user.email}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Sign in
          </Button>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

ForgotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default ForgotForm;
