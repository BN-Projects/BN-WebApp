import axios from "axios";
var token = "";
export default async function postToken(obj) {
    await axios
        .get(obj)
        .then(res => {
            if (!res.data.error) {
                token = res.data;
                console.log(token);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return token;
}