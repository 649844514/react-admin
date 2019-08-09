import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading:false,
    list:[]
}

export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.NOTIFICATION_POST_START:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.NOTIFICATION_POST_END:
            return {
                ...state,
                isLoading:false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(item => {
                if( item.id === action.payload.id ){
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list:newList
            }
        case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                list:state.list.map(item => {
                    item.hasRead = true
                    return item
                })
            }
        case actionTypes.RECIVE_NOTIFICATIONS:
            return {
                ...state,
                list:action.payload.list
            }        
        default:
            return state
    }
}