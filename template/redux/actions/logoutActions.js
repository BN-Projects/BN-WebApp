import * as actionTypes from "./actionTypes";
import initialState from "../reducers/initialState";
import Router from "next/router"

export const logout = token => {
  return {
    type: actionTypes.LOGOUT_USER,
    payload: token
  };
};

export function logoutUser() {
  return function(dispatch) {
    var token = initialState.login;
    dispatch(logout(token));
    window.location.reload(false);
    
  };
}
