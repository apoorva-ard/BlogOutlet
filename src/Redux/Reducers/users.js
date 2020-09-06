import * as ActionTypes from '../ActionTypes';

const initstate = { isLoading: true, errMess: null, users: [] }

export const Users = (state = initstate, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return { ...state, isLoading: false, errMess: null, users: action.payload };
        case ActionTypes.USERS_LOADING:
            return { ...state, isLoading: true, errMess: null, users: [] };
        case ActionTypes.USERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, users: [] };
        default:
            return state;
    }
};