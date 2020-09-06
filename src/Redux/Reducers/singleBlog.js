import * as ActionTypes from '../ActionTypes';

const initstate = { isLoading: true, errMess: null, blog: [] }

export const SingleBlog = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.SET_BLOG:
            return { ...state, isLoading: false, errMess: null, blog: action.payload };
        case ActionTypes.BLOG_LOADING:
            return { ...state, isLoading: true, errMess: null, blog: [] };
        case ActionTypes.BLOG_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, blog: [] };
        default:
            return state;
    }
};