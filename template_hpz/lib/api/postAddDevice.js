import axios from "axios";
var device = "";
export default async function postAddDevice(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                device = res.data.devices;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
                device = "";
            }
        })
        .catch(err => console.log(err));
    return device;
}