import { combineReducers } from "redux";

import rideReducer from "./rideReducer";
import authReducer from "./authReducer";

export default combineReducers({
    rideReducer, authReducer
});