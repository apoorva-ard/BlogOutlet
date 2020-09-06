import React,{Component} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import renderHTML from "react-render-html";
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');

class Comment extends Component {

    constructor(props){
        super(props);
        this.state = {
            comment: "",
            errors: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
        if(event.target.value.length < 1){
            this.setState({
              errors: "Comment can't be empty!"
            });
        }
        else{
            this.setState({
              errors: ""
            });
        }
        this.setState({
          comment: event.target.value
        });
     }

     handleSubmit(event){
        if(this.props.authenticated === true){
            if(this.state.errors === ""){
                const reqBody = { 
                    body: this.state.comment
                };
                this.props.postComment(this.props.blogId, reqBody);
            }
        }
        else{
            toast.info("Log in to comment!", {
                position: toast.POSITION.TOP_LEFT,
                className: 'login-notif'
            });
        }
        event.preventDefault();
     }
     render(){
        return(
            <form onSubmit={this.handleSubmit} className="mt-5">
                <Col>
                    <i className="fa fa-comment fa-lg color-setup">  Comment</i><br/><br/>
                    <textarea value={this.state.comment} onChange={this.handleChange} 
                        placeholder="Comment here.." cols={40}/>
                        <br/>
                    {this.state.errors.length > 0 && 
                        <span className='error-display'>{this.state.errors}</span>}
                </Col>
                <Col>
                    <button type="submit" className="btn btn-secondary mt-2">Post</button>
                </Col>
            </form>
        );
     }
}


const ShowBlog = (props) => {
    
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row page-filler">
                    <center>Loading</center>
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row page-filler">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.blog != null){
        const displayComments = props.comments.map((comment) => {
			dayjs.extend(relativeTime);
			return(
				<Container key={comment.createdAt} >
					<Row className="align-items-center">
						<Col xs="12" md="6">
							<p className="color-setup">{comment.userHandle}</p>
							<p>{comment.body} <i> - {dayjs(comment.createdAt).fromNow()}</i></p>
						</Col>
					</Row>
					<hr/>
				</Container>
			);
		});
        function likee() {
            if(!props.authenticated){
                toast.info("Log in to like the blog!", {
                    position: toast.POSITION.TOP_LEFT,
                    className: 'login-notif'
                });
            }
            props.postLike(props.blog.blogId);
        }
        return (
		    <Container className="topmargin-setup">
                <ToastContainer/>
                <Row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }} className="img-display"> 
                        <center><h2>{props.blog.title}</h2></center>
                        <hr/>
                        {renderHTML(props.blog.body)}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }}>
                        <hr/>
                        <Button onClick={likee} color="link">
                            <i className="fa fa-heart fa-lg color-setup ml-3">{props.blog.likeCount}</i>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }}>
                        <Comment blogId = {props.blog.blogId} 
                            postComment = {props.postComment}
                            authenticated = {props.authenticated}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs="12" sm={{ size: 8, offset: 2 }}>
                        {displayComments}
                    </Col>
                </Row>
            </Container>
	    );
    }
}

export default ShowBlog;