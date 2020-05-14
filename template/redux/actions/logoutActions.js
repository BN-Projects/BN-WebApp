import * as actionTypes from "./actionTypes";
import initialState from "../reducers/initialState";
import Router from "next/router"
import { message } from 'antd';

export const logout = token => {
  return {
    type: actionTypes.LOGOUT_USER,
    payload: token
  };
};

const success = () => {
  message.success("Çıkış Başarılı");
};

export function logoutUser() {
  return function(dispatch) {
    var token = initialState.login;
    dispatch(logout(token));
    //success();
  };
}
