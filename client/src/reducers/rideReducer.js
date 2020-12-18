import { GET_RIDES, RIDES_LOADING, RIDES_ERROR } from "../actions/types";

const initialState = {
    rides: [],
    loading: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_RIDES:
            return {
                ...state,
                rides: [action.payload, ...state.rides],//adicionar ao array rides
                loading: false
            };

        case RIDES_LOADING:
            return {
                ...state,
                loading: true
            }
        case RIDES_ERROR:
        default:
            return state;
    }
}