import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";
export default function authReducer(state = initialState.register, action) {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
}
