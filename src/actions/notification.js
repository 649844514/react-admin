import actionTypes from './actionTypes'
import { getNotifications } from '../requests'

const postStart = () => {
    return {
        type:actionTypes.NOTIFICATION_POST_START
    }
}
const postEnd = () => {
    return {
        type:actionTypes.NOTIFICATION_POST_END
    }
}
const reciveNotifications = (resp) => {
    return {
        type:actionTypes.RECIVE_NOTIFICATIONS,
        payload:{
            list:resp.list
        }
    }
}
 
export const markNotificationAsReadById = (id) => {
    return {
        type:actionTypes.markNotificationAsReadById,
        payload:{
            id
        }
    }
}

export const markAllNotificationsAsRead = () => {
    return {
        type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
    }
}

export const getNotificationList = () => {
    return dispatch => {
        dispatch(postStart())
        getNotifications()
            .then(resp => {
                dispatch(reciveNotifications(resp))
                dispatch(postEnd())
            })
    }
}