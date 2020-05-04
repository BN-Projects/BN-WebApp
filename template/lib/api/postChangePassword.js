import axios from "axios";
import {message} from "antd"
var password = "";
export default async function putChangePassword(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            console.log(res)
            if (!res.data.error) {
                token = res.data;
                console.log(password);
            } else {
                console.log(res.data.message);
                message.info(res.data.message)
            }
        })
        .catch(err => console.log(err));
    return password;
}