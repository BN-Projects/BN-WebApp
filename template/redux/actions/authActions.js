import * as actionTypes from "./actionTypes";
import postLogin from "../../lib/api/postLogin";
import Router from "next/router";

export const setCurrentUser = token => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: token
  };
};

export function loginUser(obj) {
  return function(dispatch) {
    postLogin(obj).then(res => {
      dispatch(setCurrentUser(res));
      if (res != "") {
        Router.push("/homepage");
      }
    });
  };
}
