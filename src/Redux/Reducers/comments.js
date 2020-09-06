import * as ActionTypes from '../ActionTypes';

const initstate = { isLoading: true, errMess: null, comments: [] }

export const Comments = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMess: null, comments: action.payload };
        case ActionTypes.COMMENTS_LOADING:
            return { ...state, isLoading: true, errMess: null, comments: [] };
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] };
        default:
            return state;
    }
};