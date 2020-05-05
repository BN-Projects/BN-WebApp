import { combineReducers } from "redux";

import authReducer from "./authReducer";
import registerReducer from "./registerReducer";

import profileViewReducer from "./profileViewReducer";
import profileEditReducer from "./profileEditReducer";
import passwordChangeReducer from './passwordChangeReducer'
import registerControlReducer from './registerControlReducer'

import productlistReducer from "./productListReducer";
import productAddReducer from "./productAddReducer"

import stockViewReducer from "./stockViewReducer";
import addDeviceReducer from './addDeviceReducer'


import cartReducer from "./cartReducer";
import shoppingReducer from './shoppingReducer'

const rootReducer = combineReducers({
  authReducer,
  registerReducer,
  profileViewReducer,
  profileEditReducer,
  productlistReducer,
  stockViewReducer,
  productAddReducer,
  cartReducer,
  passwordChangeReducer,
  shoppingReducer,
  addDeviceReducer,
  registerControlReducer,
});

export default rootReducer;

//tüm reducer'lar toplandı
