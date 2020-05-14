import axios from "axios";
var stockRemove = "";
export default async function postStockRemove(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                stockRemove = res.data;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return stockRemove;
}