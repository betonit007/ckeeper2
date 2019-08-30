import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    LOGIN_SUCCESS
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
          localStorage.setItem('token', action.payload.token) // Since registration was successful we set the token to local storage
          return {
              ...state,
              ...action.payload,
              isAuthenticated: true,
              loading: false
          }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem('token') //remove any token in storage since login failed
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload //the payload will include error message on a fail (from action)
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}