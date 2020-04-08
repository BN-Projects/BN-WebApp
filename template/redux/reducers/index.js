import {combineReducers} from 'redux'
import changeCategoryReducer from './changeCategoryReducer'
import categoryListReducer from './categoryListReducer'
import productListReducer from './productListReducer'
import authReducer from './authReducer'
const rootReducer = combineReducers({
    changeCategoryReducer,
    categoryListReducer,
    authReducer,
    productListReducer
})
export default rootReducer

//tüm reducer'lar toplandı