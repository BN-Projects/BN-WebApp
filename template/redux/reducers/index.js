import { combineReducers } from "redux";

import authReducer from "./authReducer";
import registerReducer from "./registerReducer";

import profileViewReducer from "./profileViewReducer";
import profileEditReducer from "./profileEditReducer";
import passwordChangeReducer from './passwordChangeReducer';
import registerControlReducer from './registerControlReducer';
import lostPasswordReducer from './lostPasswordReducer';
import passwordResetReducer from './passwordResetReducer';
import notificationViewReducer from './notificationViewReducer';
import emailReducer from './emailReducer';

import productlistReducer from "./productListReducer";
import productAddReducer from "./productAddReducer";

import stockViewReducer from "./stockViewReducer";
import addDeviceReducer from './addDeviceReducer';


import cartReducer from "./cartReducer";
import shoppingReducer from './shoppingReducer'

import contactFormReducer from './contactFormReducer'

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
  passwordResetReducer,
  contactFormReducer,
  notificationViewReducer,
  lostPasswordReducer,
  emailReducer,
});

export default rootReducer;

//tüm reducer'lar toplandı
