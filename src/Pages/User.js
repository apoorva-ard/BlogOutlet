import React from 'react';
import { Container, Col, Row , Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');

const User = (props) => {
    
    const displayUserBlogs = props.blogs.map((blog) => {
		dayjs.extend(relativeTime);
        if(props.authUser.authenticated!== true){
            return (<Redirect to='/home'/>);
        }
		else if(blog.userHandle === props.authUser.user.credentials.handle){
                
            const blogdelete = () => {
                props.deleteBlog(blog.blogId);
            }

			return(
                <Container className="hover-decoration blog-card">
					<Link to ={`/blogs/${blog.blogId}`} style={{ textDecoration: 'none', color: "black" }} key={blog.blogId} >
						<Row className="align-items-center">
							<Col className="userimage-padding">
								<h5>{blog.title}</h5>
								<p><i> - {dayjs(blog.createdAt).fromNow()}</i></p>
                                <p><i> Tags : {blog.tags} </i></p>
							</Col>
						</Row>
					</Link>
                    <Row>
                        <Button color="link" className="ml-auto" onClick={blogdelete}>
                            <i className="fa fa-trash fa-lg trash-setup ml-3"> Delete</i>
                        </Button>
                    </Row>
				</Container>
				);
		}
		else{
			return (<div></div>);
		}
	});
    if(props.authUser.authenticated!== true){
        return (<Redirect to='/home'/>);
    }
    if (props.authUser.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    Loading
                </div>
            </div>
        );
    }
    else if (props.authUser.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.authUser.authenticated === true && props.blogs !=null){
        const handleImageChange = (event) => {
            const image = event.target.files[0];
            const formData = new FormData();
            formData.append('image', image, image.name);
            console.log(formData);
            props.uploadImage(formData);
        };
        const handleEditPicture = () => {
            const fileInput = document.getElementById('imageInput');
            fileInput.click();
        };
        return (
		    <Container className="topmargin-setup">
                <Row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }}>
                        <center>
                            <img src = {props.authUser.user.credentials.imageUrl} alt="User" className="user-image-display"/>
                            <br/><br/>
                            <Button onClick={handleEditPicture}>Change profile</Button><br/>
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                              />
                            <br/>
                            <h4>{props.authUser.user.credentials.handle}</h4>
                            <hr/>
                        </center>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }}>
                        <center>
                            <h3 className="color-setup">Your Blogs</h3><br/>
                            {displayUserBlogs}
                        </center>
                    </Col>
                </Row>
            </Container>
	    );
    }
    else{
        return(<div></div>)
    }
}

export default User;