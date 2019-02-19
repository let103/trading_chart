import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className="form-container">
                <div class="panel">
                    <h2> Login</h2>
                    <p>Please enter your email and password</p>
                </div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col sm={12}>
                            <FormControl type="email" placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={12} >
                        <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={12}>
                        <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={12}>
                        <Button type="submit" bsStyle="primary" className="full-width-btn">Login</Button>
                        </Col>
                    </FormGroup>
                    </Form>
            </div>
        );
    }
}

Login.propTypes = {

};

export default Login;