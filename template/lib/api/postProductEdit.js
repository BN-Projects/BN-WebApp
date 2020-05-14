import axios from "axios";
var productEdit = "";
export default async function postProductEdit(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                productEdit = res.data;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return productEdit;
}