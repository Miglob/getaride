import { GET_RIDES, RIDES_LOADING, RIDES_ERROR, ADD_RIDE, GET_RECENT_RIDES, GET_MY_RIDES, DELETE_RIDE, CREATE_PASSENGERS } from "./types";
import axios from "axios";

export const getRides = () => dispatch => {
    dispatch(setRidesLoading());//chama função setRidesLoading
    axios.get('/api/rides')//pedido - ver directoria: localhost???
        .then(res => dispatch({//vai para o reducer, switch. Resposta ao servidor
            type: GET_RIDES,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: RIDES_ERROR
            });
        });
}

export const getMyRides = (id_users) => dispatch => {
    dispatch(setRidesLoading());//chama função setRidesLoading
    axios.get(`/api/rides/myRides/${id_users}`)//pedido - ver directoria: localhost???
        .then(res => {
            dispatch({//vai para o reducer, switch. Resposta ao servidor
                type: GET_MY_RIDES,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: RIDES_ERROR
            });
        });
}

export const setRidesLoading = () => {
    return {
        type: RIDES_LOADING
    };
};

export const addRide = (ride, callback) => (dispatch) => {
    axios.post("/api/rides", ride)
        .then(res => {
            dispatch({
                type: ADD_RIDE,
                payload: res.data
            });
            callback();
        })
        .catch(err => {
            dispatch({
                type: RIDES_ERROR
            });
        });
};

export const getRecentRides = () => dispatch => {
    dispatch(setRidesLoading());//chama função setRidesLoading
    axios.get('/api/rides/recentRides')//pedido - ver directoria: localhost???
        .then(res => dispatch({//vai para o reducer, switch. Resposta ao servidor
            type: GET_RECENT_RIDES,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: RIDES_ERROR
            });
        });
}

export const deleteRide = (id_users, id_hitchhikes) => (dispatch) => {

    axios.delete(`/api/rides`, {data: {id_users, id_hitchhikes}})
        .then(res => {
            dispatch({
                type: DELETE_RIDE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: RIDES_ERROR
            });
        });
};

export const createPassenger = (id_user, id_hitchhike) => (dispatch) => {

    axios.post("/api/rides/createPassengers", {id_user, id_hitchhike})
        .then(res => {
            dispatch({
                type: CREATE_PASSENGERS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: RIDES_ERROR
            });
        });
};

