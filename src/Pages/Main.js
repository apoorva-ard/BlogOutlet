import React,{Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import NavBarC from '../Components/NavBar';
import Blog from './Blog';
import Footer from '../Components/Footer';
import Home from './Home';
import Login from './Login';
import Contact from './Contact';
import User from './User';
import Signup from './Signup';
import ShowBlog from './ShowBlog';
import '../App.css';

import { fetchBlogs, submitLogin, submitSignup, fetchUsers, logoutUser, 
    reLogin, postBlog, postComment, postLike, uploadImage, 
    deleteBlog, fetchComments, postFeedback } from '../Redux/ActionCreators';

const mapStateToProps = state => {
    return {
        blogs: state.blogs,
        login: state.login,
        signup: state.signup,
        users: state.users,
        authUser: state.authUser,
        comments: state.comments
    }
}
const mapDispatchToProps = dispatch => ({
    fetchComments: () => dispatch(fetchComments()),
    fetchBlogs: () => dispatch(fetchBlogs()),
    fetchUsers: () => dispatch(fetchUsers()),
    logoutUser: () => dispatch(logoutUser()),
    reLogin: () => dispatch(reLogin()),
    uploadImage: (formData) => dispatch(uploadImage(formData)),
    postBlog: (blogData) => dispatch(postBlog(blogData)),
    deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
    postFeedback: (data) => dispatch(postFeedback(data)),
    postComment: (blogId, formData) => dispatch(postComment(blogId, formData)),
    postLike: (blogId) => dispatch(postLike(blogId)),
    submitLogin: (userData) => dispatch(submitLogin(userData)),
    submitSignup: (userData) => dispatch(submitSignup(userData))
});


class Main extends Component {
    
    constructor(props){
        super(props);
        this.checkLogin = this.checkLogin.bind(this);
    }

    componentDidMount(){
        this.props.fetchBlogs();
        this.props.fetchUsers();
        this.props.fetchComments();
        this.checkLogin();
    }
    
    checkLogin = () => {
        const token = localStorage.FBIdToken;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                this.props.logoutUser();
                toast.info("Session Expired! Please log in again", {
                    position: toast.POSITION.TOP_LEFT,
                    className: 'login-notif'
                });
                window.location.href = '/home';
            } 
            else {
                axios.defaults.headers.common['Authorization'] = token;
                this.props.reLogin();
            }
        }
    }
    componentDidUpdate(prevProps, prevState){ 
        if(this.props.authUser.authenticated === true && prevProps.authUser.authenticated!==true){
            toast.success("Logged in!", {
                position: toast.POSITION.TOP_LEFT,
                className: 'login-notif'
            });
        }
        if(this.props.authUser.successUpload === true && prevProps.authUser.successUpload!==true){
            toast.success("Successful!", {
                position: toast.POSITION.TOP_LEFT,
                className: 'login-notif'
            });
        }
        if(this.props.authUser.uploadFail === true && prevProps.authUser.uploadFail!==true){
            toast.info("Action Failed!", {
                position: toast.POSITION.TOP_LEFT,
                className: 'login-notif'
            });
        }
    }

    render() {
        const BlogSelector = ({ match }) => {
            return (
                <ShowBlog 
                    blog={this.props.blogs.blogs.filter((blog) => blog.blogId === match.params.blogId)[0]}
                    comments={this.props.comments.comments.filter((blog) => blog.blogId === match.params.blogId)}
                    isLoading={this.props.blogs.isLoading}
                    errMess={this.props.blogs.errMess}
                    postComment={this.props.postComment}
                    postLike={this.props.postLike}
                    authenticated={this.props.authUser.authenticated}
                />
            );
        }
        return(
            <div className="app-content">
                <ToastContainer />
                <NavBarC authUser={this.props.authUser} logout={this.props.logoutUser}/>
                <Route path="/" exact component={() => 
                        <Home blogs={this.props.blogs.blogs} 
                            isLoading={this.props.blogs.isLoading}
                            errMess={this.props.blogs.errMess}   
                        /> 
                    } />
                <Route path="/home" exact component={() =>
                        <Home blogs={this.props.blogs.blogs} 
                            isLoading={this.props.blogs.isLoading}
                            errMess={this.props.blogs.errMess}   
                        /> 
                } />
                <Route path="/blog" component={() => 
                        <Blog
                            postBlog={this.props.postBlog}
                        />
                }/>
                <Route path="/login" component={() => 
                        <Login login={this.props.login} 
                               submitLogin={this.props.submitLogin}
                        />
                    } />
                <Route path="/signup" component={() => 
                        <Signup signup={this.props.signup} 
                                submitSignup={this.props.submitSignup}
                                users={this.props.users}
                        />
                } />
                
                <Route path="/contactus" component={() => 
                        <Contact authUser={this.props.authUser}
                                postFeedback={this.props.postFeedback}
                        />
                } />

                <Route path="/user" component={() => 
                        <User authUser={this.props.authUser}
                            blogs={this.props.blogs.blogs}
                            uploadImage={this.props.uploadImage}
                            deleteBlog={this.props.deleteBlog}
                                />
                } />

                <Route path='/blogs/:blogId' component={BlogSelector} />
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));