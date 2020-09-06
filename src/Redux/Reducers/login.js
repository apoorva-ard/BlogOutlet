import * as ActionTypes from '../ActionTypes';

const initstate = { isLoading: true, errMess: null, success: false }

export const Login = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.LOGGING_IN:
            return { ...state, isLoading: true, errMess: null, success: false };
        case ActionTypes.LOGGED_IN:
            return { ...state, isLoading: false, errMess: null, success: true };
        case ActionTypes.LOGIN_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, success: false };
        default:
            return state;
    }
};