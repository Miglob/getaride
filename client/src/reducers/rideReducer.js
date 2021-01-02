import { GET_RIDES, RIDES_LOADING, RIDES_ERROR, GET_RECENT_RIDES, GET_MY_RIDES, DELETE_RIDE, CREATE_PASSENGERS, CREATE_MESSAGE } from "../actions/types";

const initialState = {
    rides: [],
    loading: false,
    recentRides: [],
    myRides: [],
    lastUpdated: new Date()
}

export default function (state = initialState, action) {

    switch (action.type) {
        case CREATE_PASSENGERS:
        case GET_RIDES:
            return {
                ...state,
                rides: action.payload,//adicionar ao array rides
                loading: false,
                lastUpdated: new Date()
            };
        case DELETE_RIDE:
        case GET_MY_RIDES:
            return {
                ...state,
                myRides: action.payload,//adicionar ao array rides
                loading: false,
                lastUpdated: new Date()
            };

        case GET_RECENT_RIDES:
            return {
                ...state,
                recentRides: action.payload,//adicionar ao array rides
                loading: false,
                lastUpdated: new Date()
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