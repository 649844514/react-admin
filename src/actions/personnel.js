import actionTypes from './actionTypes'
import { getProjects} from '../requests'

const getPost = () => {
    return {
        type:actionTypes.GET_PROJECTS_START
    }
}  

const getProjectsSuccess = (projectInfo) => {
    return {
        type:actionTypes.GET_PROJECTS_SUCCESS,
        payload:{
            projectInfo
        }
    }
}

const getProjectsFailed = () => {
    return {
        type:actionTypes.GET_PROJECTS_FAILED
    }
}

export const changerProject = (projectValue) => {
    return {
        type:actionTypes.PROJECT_CHANGE,
        payload:{
            projectValue
        }
    }
}

export const getProject = () => {
    return dispatch => {
        dispatch(getPost())
        getProjects()
            .then(resp => {
                dispatch(getProjectsSuccess(resp.list))
            })
            .catch(err => {
                dispatch(getProjectsFailed())
            })
    }
}