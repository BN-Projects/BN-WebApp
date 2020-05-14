import axios from "axios";
var stockEdit = "";
export default async function postStockEdit(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                stockEdit = res.data;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return stockEdit;
}