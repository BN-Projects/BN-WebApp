import { getConnectionLink } from "../connector";
import axios from "axios";
var token = "";
export default async function postLogin(directory, paramsNames, paramsValues) {
    var obj = getConnectionLink(directory, paramsNames, paramsValues, "POST");
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                token = res.data.user_token;
                console.log(token);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return token;
}