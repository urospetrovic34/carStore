import {combineReducers} from 'redux'
import userReducer from './userReducer'
import carReducer from './carReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    user:userReducer,
    error:errorReducer,
    car:carReducer
})