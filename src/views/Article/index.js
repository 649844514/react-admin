import React, { Component } from 'react';
import { Card, Button, Table, Tooltip, Tag, Modal, Typography, message } from 'antd'
import { getArticleList, deleteArticleById } from '../../requests'
import XLSX from 'xlsx'
import moment from 'moment'

const ButtonGroup = Button.Group
const { Text } = Typography

const titliDisplayMap = {
    id:'id',
    title:'标题',
    author:'作者',
    amount:'阅读量',
    createAt:'创建时间'
  }



class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource : [],
            columns : [],
            total:0,
            isLoading:false,
            offset:0,
            limited:10,
            deleteTitle:'',
            deleteArticleModelShow:false,
            deleteArticleModelLoading:false
         }
    }

    // 跳转编辑页面
    toEdit= (id)=>{
        this.props.history.push(`/admin/article/edit/${id}`)
      }
  
    // 显示删除弹窗 
    showDeleteArticleModel = (record)=>{
        this.setState({
            deleteArticleModelShow:true,
            deleteTitle:record.title,
            deleteArticleID:record.id 
        })
    }

    // 删除文章
    deleteArticle = () => {
        this.setState({
          deleteArticleModelLoading: true,
        });
        deleteArticleById(this.state.deleteArticleID)
        .then(resp=>{
          message.success(resp.msg)
          this.setState({
            offset:0
          },()=>{
            this.getData()
          })
          
        })
        .catch(err=>{
          // 处理error
        })
        .finally(()=>{
          this.setState({
            deleteArticleModelShow: false,
            deleteArticleModelLoading: false,
          });
        })
      };
      
      // 关闭删除弹窗
      hideArticleModel = () => {
        this.setState({
          deleteArticleModelShow: false,
          deleteArticleModelLoading: false,
          deleteTitle:''
        });
      }

    createColumns = (columnKeys) => {
        const columns = columnKeys.map(item => {
            if(item === 'amount'){
                return {
                    title: titliDisplayMap[item],
                    key: item,
                    render:(record)=>{
                    const { amount } = record
                    return (
                        <Tooltip title={amount > 230 ? '超过230' : '不足230'} placement='right' >
                            <Tag color={amount > 230 ? 'red' : 'green'}>{record.amount}</Tag>
                        </Tooltip>
                    )
                    }
                }
            }else if(item === 'createAt'){
                return {
                    title: titliDisplayMap[item],
                    key: item,
                    render:(record)=>{
                    const { createAt } = record
                    return moment(createAt).format("YYYY-MM-DD HH:mm:ss")
                    }
                }
            }
            return  {
                title: titliDisplayMap[item],
                dataIndex: item,
                key: item
            }
        })

        // 添加操作列
        columns.push({
            title:'操作',
            key:'action',
            render:(record)=>{
            return (
                <ButtonGroup>
                    <Button size='small' type='primary' onClick={this.toEdit.bind(this,record.id)} style={{marginRight:'20px'}} >编辑</Button>
                    <Button size='small' type='danger' onClick={this.showDeleteArticleModel.bind(this,record)}>删除</Button>
                </ButtonGroup>
            )
            }
        })

        return columns
    }

    getData = () => {
        this.setState({
            isloading:true
        })
        getArticleList(this.state.offset,this.state.limited)
            .then(resp => {
                const columnKeys = Object.keys(resp.list[0])
                const columns = this.createColumns(columnKeys)
                if(!this.updater.isMounted(this)) return
                this.setState({
                    dataSource:resp.list,
                    total:resp.total,
                    columns
                })
            })
            .catch(err => {

            })
            .finally(() => {
                if(!this.updater.isMounted(this)) return
                this.setState({
                    isloading:false
                })
            })
    }

    // 切换分页
    onPageChaneg = (page, pageSize)=>{
        this.setState({
            offset:pageSize*(page - 1),
            limited:pageSize
        },()=>{
            this.getData()
        })
    }

    // pageSize 改变
    onShowSizeChange = (current, size)=>{
        this.setState({
            offset:0,
            limited:size
        },()=>{
            this.getData()
        })
    }

    // 导出excel
    toExcel = ()=>{
        // 组合数据
        const item = this.state.dataSource
        const data = [Object.keys(item[0])]
        // const data=[["id","title","author","amount","createAt"]]
        for( let i=0;i< item.length;i++){
            // data.push(Object.values(item[i]))
            data.push([
            item[i].id,
            item[i].title,
            item[i].author,
            item[i].amount,
            moment(item[i].createAt).format('YYYY-MM-DD HH:mm:ss')
            ])
        }
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
    }

    change = ()=>{
        window.less.modifyVars(//更换主题颜色要这么写
            {
                '@primary-color': '#e64e14'
            }
        )
        .then(() => {console.log('success')})
        .catch(error => {
            console.log(error);
        });

    }

    componentDidMount(){   
        this.getData()
    }

    render() { 
        return (  
            <Card title='文章列表' bordered={false}  extra={<div><Button onClick={this.change}>change</Button><Button onClick={this.toExcel}>导出excel</Button></div>} >
                    <Table 
                        rowKey={record => record.id }
                        columns={this.state.columns} 
                        dataSource={this.state.dataSource}
                        loading = {this.state.isloading} 
                        pagination={{
                            current:this.state.offset / this.state.limited + 1,
                            total:this.state.total,
                            hideOnSinglePage:true,
                            showQuickJumper:true,
                            showSizeChanger:true,
                            onChange:this.onPageChaneg,
                            onShowSizeChange:this.onShowSizeChange,
                            pageSizeOptions:['10', '20', '30', '40']
                        }}
                    
                    />
                    <Modal
                        title="此操作不可逆，请谨慎操作！！！"
                        content={this.state.deleteArticleModelContent}
                        visible={this.state.deleteArticleModelShow}
                        confirmLoading={this.state.deleteArticleModelLoading}
                        onOk={this.deleteArticle}
                        onCancel={this.hideArticleModel}
                        maskClosable='false'
                    >
                      <Typography>确定要删除<Text type='danger'>{this.state.deleteTitle}</Text>吗？</Typography>
                  </Modal>
            </Card>
        );
    }
}
 
export default ArticleList;