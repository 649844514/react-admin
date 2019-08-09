import Loadable  from 'react-loadable'
import { Loading } from '../components'

const Login = Loadable({
    loader:() => import('./Login'),
    loading:Loading
})
const NotFound = Loadable({
    loader:() => import('./NotFound'),
    loading:Loading
})
const NoAuth = Loadable({
    loader:() => import('./NoAuth'),
    loading:Loading
})
const Home = Loadable({
    loader:() => import('./Home'),
    loading:Loading
})
const ArticleList = Loadable({
    loader:() => import('./Article'),
    loading:Loading
})
const ArticleEdit = Loadable({
    loader:() => import('./Article/Edit'),
    loading:Loading
})
const Settings = Loadable({
    loader:() => import('./Settings'),
    loading:Loading
})
const Notification = Loadable({
    loader:() => import('./Notification'),
    loading:Loading
})
const PersonalSettings = Loadable({
    loader:() => import('./PersonalSettings'),
    loading:Loading
})

export {
    Login,
    NotFound,
    NoAuth,
    Home,
    ArticleList,
    ArticleEdit,
    Settings,
    Notification,
    PersonalSettings
}