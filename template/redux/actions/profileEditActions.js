import * as actionTypes from "./actionTypes";
import putProfile from "../../lib/api/putProfile";


export const profileEdit = profileData => {
  return {
    type: actionTypes.PROFILE_EDIT_PAGE,
    payload: profileData
  };
};

export function profileEditPage(obj) {
  return function(dispatch) {
    putProfile(obj).then(res => {
      dispatch(profileEdit(res));
      if (res != "") {
        console.log("neyi başardın")
      } 
      else {
            console.log("başaramadı")
      }
    });
  };
}
