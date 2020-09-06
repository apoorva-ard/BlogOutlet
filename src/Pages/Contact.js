import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import ReactStars from "react-rating-stars-component";

class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            rating: 3,
            body: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
    }    
     
    handleChange(event) {
        this.setState({
          body: event.target.value
        });
     }

     ratingChanged = (newRating) => {
          this.setState({
            rating: newRating
        });
     };

     handleSubmit(event) {
        this.props.postFeedback(this.state)
        event.preventDefault();
     }

     render() {
        return (
        <Container className="form-setup link-setup">
            <Row>
                <Col xs="12" md="6">
                    <form onSubmit={this.handleSubmit}>
                        <h3><center>Your Valuable Feedback</center></h3><hr/>
                        
                        <Row>
                            <Col xs="12" md="2">
                                Rating
                            </Col>
                            <Col>
                                <ReactStars
                                    count={5}
                                    onChange={this.ratingChanged}
                                    value={this.state.rating}
                                    size={24}
                                    activeColor="#ffd700"
                                    />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col xs="12" md="2">
                                Comments
                            </Col>
                            <Col>
                                <textarea value={this.state.body} onChange={this.handleChange} rows={6} cols={45}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" md={{ offset: 2}}>
                                <button type="submit" className="btn btn-warning mt-5">Post Feedback</button>
                            </Col>
                        </Row>
                        <br/>
                        <br/>

                        <div className="error-display">
                            
                        </div>

                    </form>
                </Col>
                <Col>
                    <h3><center>Contact Information</center></h3>
                    
                    <hr/>                    
                    <Row>
                        <Col xs="12" md="4">
                            <b>Mail id:</b> 
                        </Col>                    
                        <Col>                    
                            blogoutlet@gmail.com
                        </Col>
                    </Row>
                    <br/>
                    <br/>

                                   
                    <Row>
                        <Col xs="12" md="4">
                            <b>Address:</b>
                        </Col>                    
                        <Col>      
                            PSG Tech Hostels,<br/>
                            PSG College Of Technology,<br/>
                            Coimbatore, TamilNadu,<br/>
                            India - 641041.<br/> 
                        </Col>    
                    </Row>     
                    
                    <br/>
                    <br/>
                              
                    <Row>
                        <Col xs="12" md="4">
                            <b>Mobile number:</b>
                        </Col>                    
                        <Col>      
                            +91 6369619922
                        </Col>
                    </Row>
                 </Col>
            </Row>
        </Container>
        );
    }
}

export default Contact;