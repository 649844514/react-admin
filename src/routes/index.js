import {
    Login,
    NotFound,
    NoAuth,
    Home,
    ArticleList,
    ArticleEdit,
    Settings,
    Notification,
    PersonalSettings
} from '../views'

export const mainRoutes = [{
    pathname:'/login',
    component:Login
},{
    pathname:'/404',
    component:NotFound
}]

export const adminRoutes = [{
    pathname:'/admin/noauth',
    component:NoAuth,
    roles:['001','002','003']
},{
    pathname:'/admin/home',
    component:Home,
    title:'首页',
    icon:'home',
    isNav:true,
    roles:['001','002','003']
},{
    pathname:'/admin/article',
    component:ArticleList,
    title:'文章管理',
    icon:'unordered-list',
    isNav:true,
    exact:true,
    roles:['001','002','003']
},{
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit,
    roles:['001','002']
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    icon:'setting',
    isNav:true,
    roles:['001']
},{
    pathname:'/admin/notification',
    component:Notification,
    roles:['001','002','003']
},{
    pathname:'/admin/personalsettings',
    component:PersonalSettings,
    roles:['001','002','003']
}]