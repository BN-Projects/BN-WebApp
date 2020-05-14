import axios from "axios";
var remove = "";
export default async function postProductRemove(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                remove = res.data;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return remove;
}