import axios from "axios";
var shopping = "";
export default async function postShopping(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            console.log(res)
            if (!res.data.error) {
                shopping = res.data.shoppings;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return shopping;
}