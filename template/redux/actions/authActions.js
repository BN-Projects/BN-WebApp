import axios from 'axios';
import * as actionTypes from './actionTypes';
import { getConnectionLink } from '../../lib/connector';
import { saveState } from '../../utils/localStorage';
//import setAuthToken from '../../utils/setAuthToken';

// Kayıt ol
// export function registerUser(directory, paramsNames,paramsValues)  
// {
//     bu kısım bir fonksiyonda olacak **yapılacak.
//     return function(dispatch){
//     var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST");                                      
//     axios.post(obj.url,obj.data)
//     .then((res) => {
//     if(!res.data.error)
//     {
//         var success = res.data.error
//         console.log(token)
//         dispatch(setCurrentUser(token))
//     }
//     else
//     {
//         console.log(res.data.message)
//     }
// })

// Signin

export function loginUser(directory, paramsNames,paramsValues)  
{
    //bu kısım bir fonksiyonda olacak **yapılacak.
    return function(dispatch){
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST");                                      
    axios.post(obj.url,obj.data)
    .then((res) => {
    if(!res.data.error)
    {
        var token = res.data.user_token
        console.log(token);
        saveState(token,token);
        //sessionStorage.setItem('tokenn',token);
        dispatch(setCurrentUser(token));
    }
    else
    {
        console.log(res.data.message)
    }
})
.catch(err => console.log(err))
}
}
    // Reducere git.
export const setCurrentUser = user_token => {
    return {
      type: actionTypes.SET_CURRENT_USER,
      payload: user_token
    };
};


