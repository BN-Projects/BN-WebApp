import {combineReducers} from 'redux'
import authReducer from './authReducer'
const rootReducer = combineReducers({
    authReducer,
})
export default rootReducer

//tüm reducer'lar toplandı