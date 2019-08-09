import { combineReducers } from 'redux'
import login from './login'
import notification from './notification'
import home from './home'

export default combineReducers({
    login,
    notification,
    home
})