import * as ActionTypes from '../ActionTypes';

const initstate = { isLoading: true, errMess: null, blogs: [] }

export const Blogs = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BLOGS:
            return { ...state, isLoading: false, errMess: null, blogs: action.payload };
        case ActionTypes.BLOGS_LOADING:
            return { ...state, isLoading: true, errMess: null, blogs: [] };
        case ActionTypes.BLOGS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, blogs: [] };
        default:
            return state;
    }
};