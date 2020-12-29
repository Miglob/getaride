import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import axios from "axios";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get("/api/auth/user", tokenConfig(getState)) // tokenConfig(getState) Use this if you need to send the token to an endpoint
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        });
}

// Register user
export const register = ({ user_name, email, user_password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({ user_name, email, user_password });

    axios.post("/api/auth/signUp", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS
            });
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

// Login user
export const login = ({ email, user_password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({ email, user_password });

    axios.post("/api/auth/signIn", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

// Logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().authReducer.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // If token exists, add to headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
}