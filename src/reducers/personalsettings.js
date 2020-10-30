import actionTypes from '../actions/actionTypes'
const initState = {
    inputValue:'Write Somethings',
    list:['01-安达市大所大','02-安达市大所大','03-安达市大所大']
}

 
export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_INPUT_VALUE:
            return {
                ...state,
                inputValue:action.payload.inputValue
            }
        default:
            return state
    }
}