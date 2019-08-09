import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { adminRoutes } from './routes'
import { Frame } from './components'
import { connect } from 'react-redux'

const menus = adminRoutes.filter(route => route.isNav === true)
const mapState = (state) => {
    const { isLogin, role } = state.login
    return { isLogin, role }
}

@connect(mapState)
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            !this.props.isLogin ? <Redirect to='/login' /> : 
            <Frame menus={menus}>
                <Switch>
                    {
                        adminRoutes.map(route => {
                            return (
                                <Route 
                                    key={route.pathname}
                                    path={route.pathname}
                                    exact={route.exact}
                                    render={(routeProps) => {
                                        const haspermission = route.roles.includes(this.props.role)
                                        return haspermission?<route.component {...routeProps} />:<Redirect to='/admin/noauth' />
                                    }}
                                />
                            )
                        })
                    }
                    <Redirect to={adminRoutes[1].pathname} from='/admin' exact />
                    <Redirect to='/404' exact />
                </Switch>
            </Frame>  
        );
    }
}
 
export default App;