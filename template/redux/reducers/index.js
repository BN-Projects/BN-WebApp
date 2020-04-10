import { combineReducers } from "redux";
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";
import profile_viewReducer from "./profile_viewReducer";
import productlistReducer from "./productlistReducer";

const rootReducer = combineReducers({
  authReducer,
  registerReducer,
  profile_viewReducer,
  productlistReducer
});
export default rootReducer;

//tüm reducer'lar toplandı
