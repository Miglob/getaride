import { GET_RIDES, RIDES_LOADING, RIDES_ERROR, GET_RECENT_RIDES } from "../actions/types";

const initialState = {
    rides: [],
    loading: false,
    recentRides: []
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_RIDES:
            return {
                ...state,
                rides: action.payload,//adicionar ao array rides
                loading: false
            };

        case GET_RECENT_RIDES:
            return {
                ...state,
                recentRides: action.payload,//adicionar ao array rides
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