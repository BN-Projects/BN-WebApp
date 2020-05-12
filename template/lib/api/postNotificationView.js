import axios from "axios";
var notification = "";
export default async function postNotificationView(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                notification = res.data.notifications;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return notification;
}