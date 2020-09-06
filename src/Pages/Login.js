import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isChecked: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }    

    handleChange(event) {
        const target = event.target;
        const value = target.name === 'isChecked' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

     handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        this.props.submitLogin(this.state);
      }

     render() {
        return (
            <Container className="form-setup  link-setup">
                <Row>
                    <Col xs="12" md={{size: 4, offset:4}}>
                                       
                        <form onSubmit={this.handleSubmit}>
                            <h3><center>Log In</center></h3>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange}
                                className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}
                                className="form-control" placeholder="Enter password" />
                            </div>
                       

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="isChecked" checked={this.state.isChecked} onChange={this.handleChange}
                                    className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-secondary btn-block">Login</button>
                        
                            <div className="error-display">
                            {this.props.login.errMess && (
                                '*Wrong credentials! Please try again.'
                            )}
                            </div>
                        
                        </form>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs="12" md={{size: 4, offset:4}}>
                        <center>Don't have an account? <Link to='/signup'>Signup here</Link></center>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
