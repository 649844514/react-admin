import React, { Component } from 'react'
import { Layout, Menu, Icon, Avatar, Badge, Dropdown, Breadcrumb } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/login'
import { getNotificationList } from '../../actions/notification'
import './frame.less'
import logo from './logo.png'

const { Header, Content, Sider } = Layout

const mapState = (state) => {
    const { avatar, displayName } = state.login
    const notificationNoReadCount = state.notification.list.filter(item => item.hasRead === false).length
    return { avatar, displayName, notificationNoReadCount }
}

const breadcrumbNameMap = {
    '/admin/home': '首页',
    '/admin/article': '文章管理',
    '/admin/article/edit':'文章编辑',
    '/admin/settings': '设置',
    '/admin/notification': '通知中心',
    '/admin/personalsettings': '个人设置',
    '/admin/personnel': '人员管理',
    '/admin/xpphome': 'XPP首页'     
}

@connect(mapState, { logout, getNotificationList })
@withRouter
class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    // leftMenus
    onMenuClick = ({ key }) => {
        this.props.history.push(key)
    }

    //DropMenus
    renderDropMenus = () =>{
        return (
            <Menu onClick={this.onDropMenuClick}>
                <Menu.Item key='/admin/notification'>
                    <Badge dot={Boolean(this.props.notificationNoReadCount)}>
                        通知中心
                    </Badge>
                </Menu.Item>
                <Menu.Item key='/admin/personalsettings'>
                    个人设置
                </Menu.Item>
                <Menu.Item key='/admin/logout'>
                    退出登录
                </Menu.Item>
            </Menu>
        )
    }
    onDropMenuClick = ({ key }) => {
        if( key === '/admin/logout' ){
            this.props.logout()
        }else{
            this.props.history.push(key)
        }
    }

    

    componentDidMount(){
        this.props.getNotificationList()
    }

    render() { 
        const pathname =  this.props.location.pathname
        
        const selectArr = pathname.split('/')
        selectArr.length = 3
        const selectedKeys = selectArr.join('/')
        
        const extraBreadcrumbItems =  (
            pathname === '/admin/home'?
            <Breadcrumb.Item key={pathname}>
                <Link to={pathname}>{breadcrumbNameMap[pathname]}</Link>
            </Breadcrumb.Item>
            :pathname.includes('/admin/article/edit/')?
            [<Breadcrumb.Item key="home">
               <Link to='/'>首页</Link>
            </Breadcrumb.Item>].concat(
                <Breadcrumb.Separator key={Math.random()} />
            ).concat(
                <Breadcrumb.Item key={'/admin/article'}>
                    <Link to={'/admin/article'}>{breadcrumbNameMap['/admin/article']}</Link>
                </Breadcrumb.Item>
            ).concat(
                <Breadcrumb.Separator key={Math.random()} />
            ).concat(
                <Breadcrumb.Item key={pathname}>
                    <Link to={pathname}>{breadcrumbNameMap['/admin/article/edit']}</Link>
                </Breadcrumb.Item>
            )
            :[<Breadcrumb.Item key="home">
               <Link to='/'>首页</Link>
            </Breadcrumb.Item>].concat(
                <Breadcrumb.Separator key={Math.random()} />
            ).concat(
                <Breadcrumb.Item key={pathname}>
                    <Link to={pathname}>{breadcrumbNameMap[pathname]}</Link>
                </Breadcrumb.Item>
            )
            
        )
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                <Icon type="home" /> 位置
                <Breadcrumb.Separator>:</Breadcrumb.Separator>
            </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems);
        return ( 
            <Layout className='frame'>
                <Header className="header head">
                    <div className="logo">
                        <img src={logo} alt='ADMIN' />
                    </div>
                    <div className='dropmenu'>
                    <Dropdown overlay={this.renderDropMenus}>
                        <div className="ant-dropdown-link">
                            <Avatar src={this.props.avatar} />
                            欢迎您！{this.props.displayName} 
                            <Badge count={this.props.notificationNoReadCount} offset={[-5,-5]}>
                                <Icon type="down" />
                            </Badge>
                        </div>
                    </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider 
                        className='sider'
                    >
                        <Menu
                            mode="inline"
                            selectedKeys={[selectedKeys]}
                            onClick={this.onMenuClick}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                this.props.menus.map(menu => {
                                    return (
                                        <Menu.Item key={menu.pathname} >
                                            <Icon type={menu.icon} />
                                            {menu.title}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout className='content'>
                        <Breadcrumb  separator="">{breadcrumbItems}</Breadcrumb>
                        
                        <Content className='content-main' >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
         );
    }
}
 
export default Frame;