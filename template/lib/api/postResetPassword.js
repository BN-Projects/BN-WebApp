import axios from "axios";
import {message} from "antd"
var email = "";
export default async function postResetPassword(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            console.log(res)
            if (!res.data.error) {
                token = res.data;
                console.log(email);
            } else {
                console.log(res.data.message);
                message.info(res.data.message)
            }
        })
        .catch(err => console.log(err));
    return email;
}