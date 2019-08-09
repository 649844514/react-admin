import React, { Component, createRef } from 'react'
import { Card, Button, Form, Input, DatePicker, Spin, message } from 'antd'
import E from 'wangeditor'
import './edit.less'
import { getArticleById, saveArticle } from '../../requests'
import moment from  'moment'

const formItemLayout = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
}

@Form.create()
class ArticleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading:false
        }
        this.editorRef = createRef()
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    isLoading:true
                })
                const data = Object.assign({},values,{
                    createAt:values.createAt.valueOf()
                })
                data.id = this.props.match.params.id

                saveArticle(data)
                .then(resp=>{
                   message.success(resp.msg)
                })
                .catch(err=>{
                    
                })
                .finally(()=>{
                    this.setState({
                        isLoading:false
                    })
                    this.props.history.push(`/admin/article`)
                })
            }
        })
    }

    initEditor = ()=>{
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html)=> {
            // html 即变化之后的内容
            this.props.form.setFieldsValue({
                content:html    
            });
        }
        this.editor.create()
    }

    getArticle = ()=>{   
        this.setState({
            isLoading:true
        })
        getArticleById(this.props.match.params.id)
        .then(resp=>{
            this.props.form.setFieldsValue({
                title:resp.title,
                author:resp.author,
                amount:resp.amount,
                createAt:moment(resp.createAt),
                content:resp.content
            })
            this.editor.txt.html(resp.content)
        })
        .catch(err=>{

        })
        .finally(()=>{
            this.setState({
                isLoading:false
            })
        })
    }

    componentDidMount(){
        this.initEditor()
        this.getArticle()
        
    }

    render() { 
        const { getFieldDecorator } = this.props.form
        return (  
            <Card title='文章编辑' bordered={false} extra={<Button onClick={this.props.history.goBack}>返回</Button>}>
                <Spin spinning={this.state.isLoading}>
                    <Form 
                        onSubmit={this.handleSubmit}
                        {...formItemLayout}
                    >
                        <Form.Item  label='标题'>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入标题!' }]
                            })(
                                <Input  placeholder="Title" />
                            )}
                        </Form.Item>
                        <Form.Item  label='作者'>
                            {getFieldDecorator('author', {
                                rules: [{ required: true, message: '请输入作者!' }]
                            })(
                                <Input  placeholder="admin" />
                            )}
                        </Form.Item>
                        <Form.Item  label='阅读量'>
                            {getFieldDecorator('amount', {
                                rules: [{ required: true, message: '请输入阅读量!' }]
                            })(
                                <Input  placeholder="0" />
                            )}
                        </Form.Item>
                        <Form.Item  label='发布时间'>
                            {getFieldDecorator('createAt', {
                                rules: [{ required: true, message: '请选择创建时间!' }]
                            })(
                                <DatePicker showTime placeholder="选择时间"  />
                            )}
                        </Form.Item>
                        <Form.Item  label='内容'>
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: '请输入内容!' }]
                            })(
                                <div className='reditor' ref={this.editorRef}></div>
                            )}
                        </Form.Item>
                        <Form.Item   wrapperCol={{offset:4}}    >
                            <Button type="primary" htmlType="submit" >
                                保存
                            </Button>
                        </Form.Item>
                    </Form>  
                </Spin>
            </Card>
        )
    }
}
 
export default ArticleEdit;