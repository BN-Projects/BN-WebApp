import axios from "axios";
import {message} from "antd"
var contact = "";
export default async function postContactForm(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            console.log(res)
            if (!res.data.error) {
                token = res.data;
                console.log(contact);
            } else {
                console.log(res.data.message);
                message.info(res.data.message)
            }
        })
        .catch(err => console.log(err));
    return contact;
}