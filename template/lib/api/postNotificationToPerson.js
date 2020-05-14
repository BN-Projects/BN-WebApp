import axios from "axios";
import {notification} from "antd"
var person = "";
export default async function postNotificationToPerson(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (res.data.error == "false") {
                person = res.data;
                notification['success']({
                    message: ("Kişiye Özel Bildirim Başarıyla Gönderildi."),
                    placement: "bottomRight"
                  });
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return person;
}