import React from 'react'
import ReactDOM from  'react-dom'
import { HashRouter as Router, Switch, Route, Redirect  } from 'react-router-dom'
import { ConfigProvider  } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { mainRoutes } from  './routes'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './index.less'

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider  locale={zhCN}>
            <Router>
                <Switch>
                    <Route path='/admin' component={App} />
                    {
                        mainRoutes.map(route => {
                            return (
                                <Route 
                                    key={route.pathname} 
                                    path={route.pathname} 
                                    component={route.component}
                                />
                            )
                        })
                    }
                    <Redirect to='/admin' from='/' exact />
                    <Redirect to='/404' exact />
                </Switch>
            </Router>
        </ConfigProvider >
    </Provider>,
    document.getElementById('root')
)