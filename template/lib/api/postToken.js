import { getConnectionLink } from "../connector";
import axios from "axios";
var profile = "";
export default async function postToken(directory, paramsNames, paramsValues) {
    var obj = getConnectionLink(directory, paramsNames, paramsValues, "POST");
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                profile = res.data;
                console.log(profile);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return profile;
}