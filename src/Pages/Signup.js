import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';

const validEmailRegex = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};


class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            handle: '',
            password: '',
            confirmPassword: '',
            errors: {
                handle: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateHandle = this.validateHandle.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }    
     
    validateHandle = (event) => {
        event.preventDefault();
        let errors = this.state.errors;

        errors.handle = '';
            
        if(event.target.value.length < 5){
            errors.handle = 'Handle must be at least 5 characters long!';
        }
        else{
            let users = Array.from(this.props.users.users);
            let handlInvalid = users.find(user => user.handle === event.target.value);
            if(handlInvalid)
                errors.handle = 'Handle already in use!';
        }

        this.setState({
          [event.target.name]: event.target.value
        });
    }
    
    validateEmail = (event) => {
        event.preventDefault();
        let errors = this.state.errors;

        errors.email = '';
           
        if(!validEmailRegex.test(event.target.value)){
            errors.email = 'Email is not valid!';
        }
        else{
            let users = Array.from(this.props.users.users);
            let emailInvalid = users.find(user => user.email === event.target.value);
            if(emailInvalid)
                errors.email = 'Email already in use!';
        }

        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleChange(event) {
        
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'password': 
                errors.password = 
                    value.length < 8
                    ? 'Password must be at least 8 characters long!'
                    : '';
                break;
            case 'confirmPassword': 
                errors.confirmPassword = 
                    value!==this.state.password
                    ? 'Passwords do not match!'
                    : '';
                break;
            default:
                break;
        }
        this.setState({
            [event.target.name]: event.target.value
        });
      }

     handleSubmit(event) {
        if(validateForm(this.state.errors)) {
           this.props.submitSignup(this.state);
        }
        else{
          console.error('Invalid Form')
        }
        event.preventDefault();
     }

     render() {
        return (
        <Container className="form-setup link-setup">
            <Row>
                <Col xs="12" md={{size: 4, offset:4}}>
                    <form onSubmit={this.handleSubmit}>
                        <h3><center>Sign Up</center></h3>
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="handle" value={this.state.handle} onChange={this.validateHandle}
                            className="form-control" placeholder="Enter a user name" />
                            {this.state.errors.handle.length > 0 && 
                                <span className='error-display'>{this.state.errors.handle}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.validateEmail}
                            className="form-control" placeholder="Enter email" />
                            {this.state.errors.email.length > 0 && 
                                <span className='error-display'>{this.state.errors.email}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}
                            className="form-control" placeholder="Enter password" />
                            {this.state.errors.password.length > 0 && 
                                <span className='error-display'>{this.state.errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}
                            className="form-control" placeholder="Enter password again " />
                            {this.state.errors.confirmPassword.length > 0 && 
                                <span className='error-display'>{this.state.errors.confirmPassword}</span>}
                        </div>

                        <button type="submit" className="btn btn-secondary btn-block mt-5">Sign Up</button>
                        
                        
                        <div className="error-display">
                        {this.props.signup.errMess && (
                            '*Some unknown error occured! Please try again later!')}
                        </div>

                    </form>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs="12" md={{size: 4, offset:4}}>
                    <center>Already have an account? <Link to='/login'>Login here</Link></center>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default Signup;