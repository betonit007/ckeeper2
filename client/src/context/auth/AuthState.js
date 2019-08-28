import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'), // use vanilla javascript to get token from local storage.
        isAuthenticated: null, // tell us if we're logged in or not
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = () => {
        console.log('load user');
    }
    // Register User
    const register = async formData => {
        const config = {                      //since we're making a post request and sending some data we need a 'content-type' header of application json
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(formData);
        try {
            const res = await axios.post('/api/users', formData, config); //we need to pass formData and config  //*******WORKING THRU ISSUES WITH PROXY SENDING AT LOCALHOST */
            console.log('res', res);
            dispatch({ 
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    // Login User
    const login = () => {
        console.log('login');
    }
    // Logout
    const logout = () => {
        console.log('logout');
    }
    // Clear Errors
    const clearErrors = () => {
        console.log('clear Errors');
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors

            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};
export default AuthState;

