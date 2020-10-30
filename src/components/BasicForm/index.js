import React, { Component } from 'react'
import { Spin, Form, Row, Col } from 'antd'

const formItemLayout = {
    labelCol:{
        span:6
    },
    wrapperCol:{
        span:18
    }
}

@Form.create()
class BasicForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { getFieldDecorator } = this.props.form
        return ( 
            <Spin spinning={false}>
                <Form 
                    onSubmit={this.handleSubmit}
                    {...formItemLayout}
                >
                    <Row gutter={24}>
                        {
                            this.props.formlist.map((item,index) => {
                                const { label,name,rules,component } = item
                                return(
                                    <Col span={12} key={index}>
                                        <Form.Item  label={label}>
                                            {getFieldDecorator(name, {
                                                rules: rules
                                            })(
                                                component
                                            )}
                                        </Form.Item>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    
                </Form>  
            </Spin>
        );
    }
}
 
export default BasicForm;