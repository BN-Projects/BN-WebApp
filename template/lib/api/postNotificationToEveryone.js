import axios from "axios";
import {notification} from "antd"
var everyone = "";
export default async function postNotificationToEveryone(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (res.data.error == "false") {
                everyone = res.data;
                notification['success']({
                    message: ("Herkese Bildirim Başarıyla Gönderildi."),
                    placement: "bottomRight"
                  });
            } else {
                console.log(res.data);
            }
        })
        .catch(err => console.log(err));
    return everyone;
}