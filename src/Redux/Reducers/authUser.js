import * as ActionTypes from '../ActionTypes';

const initstate = { isLoading: false, errMess: null, user: [], authenticated: false, uploadFail: false, successUpload: false }

export const AuthUser = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, isLoading: false, errMess: null, user: action.payload, authenticated: true };
        case ActionTypes.LOADING_USER:
            return { ...state, isLoading: true, errMess: null, user: [], authenticated: false };
        case ActionTypes.USER_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, user: [], authenticated: false };
        case ActionTypes.SET_UNAUTHENTICATED:
            return { ...state, isLoading: false, errMess: null, user: [], authenticated: false };
        case ActionTypes.NOTIFY_FAILURE:
            return { ...state, uploadFail: true};
        case ActionTypes.NOTIFY_SUCCESS:
            return { ...state, successUpload: true };
        default:
            return state;
    }
};