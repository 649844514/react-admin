import actionTypes from './actionTypes'


export const changeInputValue = (inputValue) => {
    return {
        type:actionTypes.CHANGE_INPUT_VALUE,
        payload:{
            inputValue:inputValue
        }
    }
}