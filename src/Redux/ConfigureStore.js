import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Blogs } from './Reducers/blogs';
import { Login } from './Reducers/login';
import { Signup } from './Reducers/signUp';
import { Users } from './Reducers/users';
import { AuthUser } from './Reducers/authUser';
import { Comments } from './Reducers/comments';
import { SingleBlog } from './Reducers/singleBlog';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            blogs: Blogs,
            login: Login,
            signup: Signup,
            users: Users,
            authUser: AuthUser,
            singleBlog: SingleBlog,
            comments: Comments
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}