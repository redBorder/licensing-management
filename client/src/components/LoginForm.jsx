import React, { PropTypes } from 'react';
import {Panel, Form, FormControl, FormGroup, Col, HelpBlock, ControlLabel, Checkbox, Button, FeedBack} from 'react-bootstrap';
import { Link } from 'react-router';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
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

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Sign in
          </Button>
          <Link to={'/forgot'}>Forgot your password?</Link>
        </Col>
      </FormGroup>
    </Form> 
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
