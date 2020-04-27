import { combineReducers } from "redux";
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";

import profileViewReducer from "./profileViewReducer";

import productlistReducer from "./productListReducer";
import productAddReducer from "./productAddReducer"
import stockViewReducer from "./stockViewReducer";

const rootReducer = combineReducers({
  authReducer,
  registerReducer,
  profileViewReducer,
  productlistReducer,
  stockViewReducer,
  productAddReducer,
});

export default rootReducer;

//tüm reducer'lar toplandı
