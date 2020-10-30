import actionTypes from '../actions/actionTypes'


const initState = {
    projectValue:undefined,
    projectInfo:[],
    isLoading:false
}

export default (state = initState, action) => {
    switch(action.type){
        case actionTypes.GET_PROJECTS_START:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                projectInfo:action.payload.projectInfo,
                isLoading:false
            }
        case actionTypes.GET_PROJECTS_FAILED:
            return {
                ...state,
                projectInfo:[],
                isLoading:false
            }
        case actionTypes.PROJECT_CHANGE:
            return {
                ...state,
                projectValue:action.payload.projectValue
            }                    
        default:
            return state
    }
}