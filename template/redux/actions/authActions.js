import axios from "axios";
import * as actionTypes from "./actionTypes";
// import { getConnectionLink } from "../../lib/connector";
// import { saveState } from "../../utils/localStorage";
// import initialState from "../reducers/initialState";
// import Router from "next/router";
import postLogin from '../../lib/api/postLogin';

export const setCurrentUser = (token) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: token,
    };
};

export function loginUser(directory, paramsNames, paramsValues) {
    return function (dispatch) {
        postLogin(directory, paramsNames, paramsValues)
            .then((res) => {
                console.log(res);
                dispatch(setCurrentUser(res));
            })
    }
}

