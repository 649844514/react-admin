import axios from 'axios'
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development'

// 设置baseURL
const service = axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/224212':''
})
const service1 = axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/224212':''
})


// 统一处理接口入参和返回
service.interceptors.request.use(request => {
    request.data = Object.assign({},request.data,{
        authToken:window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')
    })
    return request
})
service.interceptors.response.use(resp => {
    if( resp.data.code === 200 ){
        return resp.data.data
    }else{
        message(resp.data.errMsg)
    }
})

// 登录
export const toLogin = (userInfo) => {
    return service1.post('/api/login',userInfo)
}

// 获取通知中心列表
export const getNotifications = () => {
    return service.post('/api/notifications')
}

// 获取项目
export const getProjects = () => {
    return service.post('/api/projects')
}

// 获取七日数据
export const getSevendata = () => {
    return service.post('/api/sevendata')
}

// 获取文章列表
export const getArticleList = (offset = 0, limited = 10) =>{
    return service.post('/api/article',{
        offset,
        limited
    })
}

// 通过Id删除文章
export const deleteArticleById = (id)=>{
    // return service.post(`/api/articleDelete/${id}`)
    return service.post('/api/articleDelete',{id})
}

// 通过Id获取文章信息
export const getArticleById = (id)=>{
    return service.post('/api/getArticle',{id})
}

// 保存文章
export const saveArticle = (data)=>{
    return service.post('/api/saveArticle',{data})
}

//获取待进场员工信息
export const getPersonnelWaiting = (offset = 0, limited = 10) =>{
    return service.post('/api/personnel/waiting',{
        offset,
        limited
    })
}

//获取已进场员工信息
export const getPersonnelAlready = (offset = 0, limited = 10) =>{
    return service.post('/api/personnel/already',{
        offset,
        limited
    })
}