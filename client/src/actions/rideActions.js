import { GET_RIDES, RIDES_LOADING, RIDES_ERROR, ADD_RIDE, GET_RECENT_RIDES } from "./types";
import axios from "axios";

export const getRides = () => dispatch => {
    dispatch(setRidesLoading());//chama função setRidesLoading
    axios.get('/api/rides')//pedido - ver directoria: localhost???
        .then(res => dispatch({//vai para o reducer, switch. Resposta ao servidor
            type: GET_RIDES,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response.data);
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
