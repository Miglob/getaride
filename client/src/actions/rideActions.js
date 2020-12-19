import { GET_RIDES, RIDES_LOADING, RIDES_ERROR} from "./types";
import axios from "axios";

export const getRides = () => dispatch => {
    dispatch(setRidesLoading ());//chama função setRidesLoading
    axios.get('/api/rides')//pedido - ver directoria: localhost???
        .then(data => {
            console.log(JSON.stringify(data.data))
            return data.data;
        })
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

export const setRidesLoading = () => {
    return {
        type: RIDES_LOADING
    };
};