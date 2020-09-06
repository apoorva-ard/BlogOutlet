import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const reLogin = () => (dispatch) => {
    dispatch(loginLoading(true));
    dispatch(getUserData());
    dispatch(loginSuccess());
}

export const submitLogin = (userData) => (dispatch) =>{
    dispatch(loginLoading(true));
    return axios.post('/login',userData)
		.then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch(loginSuccess());
		})
        .catch((err) => {
          dispatch(loginFailed(err));
        });
}

export const loginLoading = () => ({
    type: ActionTypes.LOGGING_IN
})

export const loginSuccess = () => ({
    type: ActionTypes.LOGGED_IN
})

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
})

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const submitSignup = (userData) => (dispatch) =>{
    dispatch(signupLoading());
    return axios.post('/signup',userData)
		.then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch(signupSuccess());
		})
        .catch((err) => {
          dispatch(signupFailed(err));
        });
}

export const signupLoading = () => ({
    type: ActionTypes.SIGNING_IN
})

export const signupSuccess = () => ({
    type: ActionTypes.SIGNED_IN
})

export const signupFailed = (errmess) => ({
    type: ActionTypes.SIGNUP_FAILED,
    payload: errmess
})

export const getUserData = () => (dispatch) => {
  dispatch(userLoading());
  axios
    .get('/user')
    .then((res) => {
        dispatch(userSet(res.data));
    })
    .catch((err) => dispatch(userFailed(err)));
};

export const userLoading = () => ({
    type: ActionTypes.LOADING_USER
})

export const userSet = (user) => ({
    type: ActionTypes.SET_USER,
    payload: user
})

export const userFailed = (err) => ({
    type: ActionTypes.USER_FAILED,
    payload: err
})

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
};


export const getBlog = (id) => (dispatch) => {
  dispatch(blogLoading());
  return axios
    .get(`/blog/${id}`)
    .then((res) => {
        console.log(res.data);
        dispatch(setBlog(res.data));
    })
    .catch((err) => dispatch(blogFailed(err)));
};

export const blogLoading = () => ({
    type: ActionTypes.BLOG_LOADING
})

export const setBlog = (user) => ({
    type: ActionTypes.SET_BLOG,
    payload: user
})

export const blogFailed = (err) => ({
    type: ActionTypes.BLOG_FAILED,
    payload: err
})

export const fetchBlogs = () => (dispatch) => {
    dispatch(blogsLoading(true));
    return axios.get('/blogs')
		.then(res => {
            if (res) {
                return res.data;
            } else {
                var error = new Error('Error ' + res.status + ': ' + res.statusText);
                error.res = res;
                throw error;
            }
		})
        .then(blogs => dispatch(addBlogs(blogs)))
        .catch(error => dispatch(blogsFailed(error.message)));
}

export const blogsLoading = () => ({
    type: ActionTypes.BLOGS_LOADING
})

export const addBlogs = (blogs) => ({
    type: ActionTypes.ADD_BLOGS,
    payload: blogs
})

export const blogsFailed = (errmess) => ({
    type: ActionTypes.BLOGS_FAILED,
    payload: errmess
})


export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading(true));
    return axios.get('/users')
		.then(res => {
            if (res) {
                return res.data;
            } else {
                var error = new Error('Error ' + res.status + ': ' + res.statusText);
                error.res = res;
                throw error;
            }
		})
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
}

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
})

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
})

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
})


export const fetchComments = () => (dispatch) => {
    dispatch(commentsLoading(true));
    return axios.get('/comments')
		.then(res => {
            if (res) {
                return res.data;
            } else {
                var error = new Error('Error ' + res.status + ': ' + res.statusText);
                error.res = res;
                throw error;
            }
		})
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})


export const postBlog = (blogData) => (dispatch) =>{
    return axios.post('/blog',blogData)
		.then(res => {
            dispatch(notifySuccess);
            dispatch(fetchBlogs());
		})
        .catch((err) => {
            dispatch(notifyFailure);
        });
}

export const deleteBlog = (blogId) => (dispatch) =>{
    return axios.delete(`/blog/${blogId}`)
		.then(res => {
            dispatch(notifySuccess);
            dispatch(fetchBlogs());
		})
        .catch((err) => {
            console.log(err);
            dispatch(notifyFailure);
        });
}

export const postComment = (blogId, formData) => (dispatch) => {
  axios
    .post(`/blog/${blogId}/comment`, formData)
    .then(() => {
        dispatch(notifySuccess);
        dispatch(fetchComments());
    })
    .catch((err) => dispatch(notifyFailure));
};

export const postLike = (blogId) => (dispatch) => {
    axios
    .get(`/blog/${blogId}/like`)
    .then(() => {
        dispatch(fetchBlogs());
    })
    .catch((err) => console.log("Can't like post!"));
};

export const postFeedback = (feedback) => (dispatch) =>{
    return axios.post('/feedback',feedback)
		.then(res => {
            dispatch(notifySuccess);
		})
        .catch((err) => {
            dispatch(notifyFailure);
        });
}

export const uploadImage = (formData) => (dispatch) => {
    axios
    .post('/user/image', formData)
    .then(() => {
        dispatch(notifySuccess);
        dispatch(getUserData());
    })
    .catch((err) => dispatch(notifyFailure));
};

export const notifyFailure = ({
    type: ActionTypes.NOTIFY_FAILURE
});

export const notifySuccess = ({
    type: ActionTypes.NOTIFY_SUCCESS
});