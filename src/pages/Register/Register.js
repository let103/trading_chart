import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createUser } from '../../store/user/actionCreator';
import { createNewUserSelector } from '../../store/user/selectors';
import './Register.css';

class Register extends Component {
    constructor(props){
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.passwordCofirmationInput = React.createRef();

        this.state = {
            emailError: "",
            passwordError: "",
            passwordConfirmationError: ""
        };
    }

    componentWillReceiveProps(nextProps){
        const message = nextProps.createNewUser.message || nextProps.createNewUser.messages;
       if(message){
            alert(message);

            if(nextProps.createNewUser.status_code == 200){
                window.location = '../user';
            }
       }
    }

    submit = (e) => {
        e.preventDefault();
        const email = this.emailInput.current.value;
        const password = this.passwordInput.current.value;
        const passwordConfirmation = this.passwordCofirmationInput.current.value;

        this.setState({
            emailError: "",
            passwordError: "",
            passwordConfirmationError: ""
        });
        
        if(!email || !password || !passwordConfirmation){
            this.setState({
                emailError: !email ? 'The email is empty!' : '' ,
                passwordError: !password ? 'The password is empty!' : '' ,
                passwordConfirmationError: !passwordConfirmation ? 'The password confirmation is empty!' : '' ,
            });
            return;
        }

        if(!this.validateEmail(email)){
            this.setState({
                emailError: 'The email format is wrong!',
                passwordError: '' ,
                passwordConfirmationError: '' ,
            });
            return;
        }

        if(password !== passwordConfirmation){
            this.setState({
                emailError: '',
                passwordError: '' ,
                passwordConfirmationError: 'The password confirmation is not match!' ,
            });

            return;
        }

        const payload = {
            body: {
                user: {
                    email,
                    password
                }
            }
        };

        this.props.createUserAction(payload);
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        return (
            <div className="form-container">
            <div class="panel">
                <h2> Register</h2>
                <p>Please enter your email and password for register</p>
            </div>
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col sm={12}>
                        <FormControl type="email" placeholder="Email" inputRef={this.emailInput} />
                        <p className="text-danger"> { this.state.emailError } </p>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col sm={12} >
                        <FormControl type="password" placeholder="Password" inputRef={this.passwordInput} />
                        <p className="text-danger"> { this.state.passwordError } </p>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword">
                    <Col sm={12} >
                        <FormControl type="password" placeholder="Confirm Password"  inputRef={this.passwordCofirmationInput}/>
                        <p className="text-danger"> { this.state.passwordConfirmationError } </p>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={12}>
                    <Button type="submit" bsStyle="primary" className="full-width-btn" onClick={ this.submit }> Register </Button>
                    </Col>
                </FormGroup>
                </Form>
        </div>
        );
    }
}

Register.propTypes = {

};

const mapStateToProps = (state) => {
	return {
        createNewUser: createNewUserSelector(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
        createUserAction: (body) => { return dispatch(createUser(body)); }
	};
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Register);