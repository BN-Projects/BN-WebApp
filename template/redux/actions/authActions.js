import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getConnectionLink } from "../../lib/connector";
import { saveState } from "../../utils/localStorage";
import initialState from "../reducers/initialState";
import Router from "next/router";

export function loginUser(directory, paramsNames, paramsValues) {
    return function (dispatch) {
        var obj = getConnectionLink(directory, paramsNames, paramsValues, "POST");
        axios
            .post(obj.url, obj.data)
            .then((res) => {
                if (!res.data.error) {
                    var token = res.data.user_token;
                    console.log(token);
                    saveState(token, token);
                    dispatch(setCurrentUser(token));
                    //Router.push("/homepage")
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((err) => console.log(err));
    };
}
// Reducere git.
export const setCurrentUser = (token) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: token,
    };
};
