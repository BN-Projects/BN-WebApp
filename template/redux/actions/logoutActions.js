import axios from 'axios';
import * as actionTypes from './actionTypes';
import { getConnectionLink } from '../../lib/connector';
import { saveState } from '../../utils/localStorage';
import initialState from '../reducers/initialState';
import Router from 'next/router';

export function logoutUser()  
{
    return function(dispatch)
    {
        var token = initialState.login;
        dispatch(logout(token));
        //Router.push("/homepage")
    }
}

export const logout = token => {
    return {
      type: actionTypes.LOGOUT_USER,
      payload: token
    };
};


