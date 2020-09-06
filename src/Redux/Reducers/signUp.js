import * as ActionTypes from '../ActionTypes';

const initstate = { isLoading: true, errMess: null, success: false }

export const Signup = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.SIGNING_IN:
            return { ...state, isLoading: true, errMess: null, success: false };
        case ActionTypes.SIGNED_IN:
            return { ...state, isLoading: false, errMess: null, success: true };
        case ActionTypes.SIGNUP_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, success: false };
        default:
            return state;
    }
};