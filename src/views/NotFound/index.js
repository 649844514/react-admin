import React, { Component } from 'react';
import { Result, Button } from 'antd'

class NotFound extends Component {
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
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在。"
                extra={<Button type="primary" onClick={this.goback} >返回首页</Button>}
            />
        );
    }
}
 
export default NotFound;