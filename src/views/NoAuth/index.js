import React, { Component } from 'react';
import { Result, Button } from 'antd'

class NoAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    goback = () => {
        this.props.history.push('/admin')
    }
    
    render() { 
        return ( 
            <Result
                status="403"
                title="403"
                subTitle="抱歉，您无权访问此页面。"
                extra={<Button type="primary" onClick={this.goback} >返回首页</Button>}
            />
         );
    }
}
 
export default NoAuth;