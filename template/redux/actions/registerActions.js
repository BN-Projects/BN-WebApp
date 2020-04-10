import * as actionTypes from "./actionTypes";
import postRegister from "../../lib/api/postRegister";

export const Register = register => {
  return {
    type: actionTypes.REGISTER_USER,
    payload: register
  };
};

export function registerUser(obj) {
  return function(dispatch) {
    postRegister(obj).then(res => {
      console.log(res);
      dispatch(Register(res));
    });
  };
}
