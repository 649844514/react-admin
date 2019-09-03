import React, { Component } from 'react';
import { Card, Form, Input, Icon, Checkbox, Button, Spin } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/login'
import './login.less'

const mapState = (state) => {
    const { isLogin, isLoading } = state.login
    return { isLogin, isLoading } 
}

@connect(mapState, { login })
@Form.create()
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values)
            }
        });
    }

    render() { 
        console.log(this.props)
        const { getFieldDecorator } = this.props.form;
        return (  
            this.props.isLogin ? <Redirect to='/admin' /> :
            <Spin spinning={this.props.isLoading}>
                <Card title='登录' bordered={false}  className="login-card">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名必填!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码必填!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        );
    }
}
 
export default Login;