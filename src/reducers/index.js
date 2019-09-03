import { combineReducers } from 'redux'
import login from './login'
import notification from './notification'
import home from './home'
import personalsettings from './personalsettings'

export default combineReducers({
    login,
    notification,
    home,
    personalsettings
})