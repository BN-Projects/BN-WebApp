import axios from "axios";
import {notification} from "antd"
var community = "";
export default async function postNotificationToCommunity(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (res.data.error == "false") {
                community = res.data;
                notification['success']({
                    message: ("Seçili Grup Bildirimi Başarıyla Gönderildi."),
                    placement: "bottomRight"
                  });
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return community;
}