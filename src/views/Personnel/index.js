import React, { Component } from 'react'
import { Card, Row, Col, Button, Select, Input, Tabs, Modal } from  'antd'
import { connect } from 'react-redux'
import { getProject, changerProject} from '../../actions/personnel'
import { getPersonnelWaiting, getPersonnelAlready } from '../../requests'
import { SearchTree, BasicTable, BasicForm } from '../../components'
import { basicInfomation } from './formlist'
import './personnel.less'
 
const { Option } = Select
const { TabPane } = Tabs

const mapState = (state) => {
    const { projectValue, projectInfo, isLoading, personnelWaiting, personnelAlready } = state.personnel
    return { projectValue, projectInfo, isLoading, personnelWaiting, personnelAlready }
}

const titliDisplayMap = {
    id:'id',
    name:'姓 名',
    sex:'性别',
    age:'年龄',
    idCard:'身份证号',
    post:'岗位'
}

@connect(mapState, { getProject, changerProject })
class Personnel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:false,
            personnelWaitingDataSource : [],
            personnelWaitingColumns : [],
            personnelWaitingTotal:0,
            personnelWaitingOffset:0,
            personnelWaitingLimited:10,
            personnelAlreadyDataSource : [],
            personnelAlreadyColumns : [],
            personnelAlreadyTotal:0,
            personnelAlreadyOffset:0,
            personnelAlreadyLimited:10,
            confirmEntry:false,
            addModelShow:false,
            saveAddModelLoading:false
         }
    }

    handleChange = (value) => {
        console.log(`${value}`)
    }

    

    createColumns = (columnKeys) => {
        columnKeys = columnKeys.slice(1)
        const columns = columnKeys.map(item => {
            return  {
                title: titliDisplayMap[item],
                dataIndex: item,
                key: item,
                width: 200
            }
        })

        // 添加操作列
        columns.push({
            title:'操作',
            key:'action',
            width: 100,
            render:(record)=>{
                return (
                    <Button 
                        size='small'
                        type='primary' 
                        onClick={this.showModel}
                        style={{marginRight:'20px'}} >修改</Button>
                )
            }
        })

        return columns
    }

    //待入场、已入场
    getPersonnelList = (getPersonnel,personneType) => {
        this.setState({
            isloading:true
        })
        let offset = this.state[personneType +'Offset']
        let limited = this.state[personneType+'Limited']
        getPersonnel(offset,limited)
            .then(resp => {
                const columnKeys = Object.keys(resp.list[0])
                const columns = this.createColumns(columnKeys)
                if(!this.updater.isMounted(this)) return
                this.setState({
                    [personneType +'DataSource']:resp.list,
                    [personneType +'Total']:resp.total,
                    [personneType +'Columns']:columns
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


    //新增Model
    showAddModel = () => {
        this.setState({
            addModelShow:true
        })
    }

    // 关闭Model
    hideAddModel = () => {
        this.setState({
            addModelShow: false
        });
    }


    //手动登记
    manualRegister = () => {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        }

        if(this.state.confirm !== true){
            const columns = this.state.personnelWaitingColumns.slice(0,-1)

            this.setState({
                personnelWaitingColumns:columns,
                confirm:true,
                rowSelection
            })
        }

        
        
    }

    //确认进场
    confirmEntry = () => {
        this.setState({
            confirm:false,
            rowSelection:null
        })
        this.getPersonnelList(getPersonnelWaiting,'personnelWaiting')
    }

    componentDidMount(){
        this.props.getProject()
        this.getPersonnelList(getPersonnelWaiting,'personnelWaiting')        
        this.getPersonnelList(getPersonnelAlready,'personnelAlready') 
    }
    

    render() {
        return ( 
            <div id='personnel'>
                <Card className='waiting' title='待进场员工信息' bordered={false} >
                    <Row gutter={16} className='personnel-row personnel-row-top'>
                        <Col span={6}>
                            <Button type='primary' onClick={this.showAddModel} >新增人员资料</Button>
                        </Col>
                        <Col span={3}>
                            {
                                this.state.confirm === true?
                                <Button className='confirm-entry'  type='primary'  onClick={this.confirmEntry} >确认进场</Button>:
                                <Button className='idcard-register'>刷身份证登记</Button>
                            }
                        </Col>
                        <Col span={3}>
                            <Button onClick={this.manualRegister} >手动登记</Button>
                        </Col>
                        <Col span={3}>
                            <Select defaultValue="全部岗位" onChange={this.handleChange}>
                                <Option value="全部岗位">全部岗位</Option>
                                <Option value="项目经理">项目经理</Option>
                                <Option value="质量员">质量员</Option>
                                <Option value="安全员">安全员</Option>
                            </Select>
                        </Col>
                        <Col span={3}>
                            <Select defaultValue="全部年龄" onChange={this.handleChange}>
                                <Option value="全部年龄">全部年龄</Option>
                                <Option value="16-30">16-30</Option>
                                <Option value="31-40">31-40</Option>
                                <Option value="41-50">41-50</Option>
                                <Option value="51-55">51-55</Option>
                                <Option value="55以上">55以上</Option>
                            </Select>
                        </Col>
                        <Col span={3}>
                            <Select defaultValue="全部性别" onChange={this.handleChange}>
                                <Option value="全部性别">全部性别</Option>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                        </Col>
                        <Col span={2}>
                            <Input placeholder='请输入姓名...' />
                        </Col>
                        <Col span={1}>
                            <Button type='primary'>搜索</Button>
                        </Col>

                    </Row>
                    <Row gutter={16} className='personnel-row personnel-row-top-content'>
                        <Col span={6}>
                            <Tabs defaultActiveKey="1" className='personnel-taps'>
                                <TabPane tab="行政职能分类" key="1">
                                    <SearchTree
                                        className='personnel-tree'
                                        data={this.props.projectInfo}
                                    />
                                </TabPane>
                                <TabPane tab="合作组织标签" key="2">
                                    <SearchTree
                                        className='personnel-tree'
                                        data={this.props.projectInfo}
                                    />
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={18}>
                            <BasicTable 
                                rowKey={record => record.id }
                                columns={this.state.personnelWaitingColumns} 
                                dataSource={this.state.personnelWaitingDataSource}
                                rowSelection={this.state.rowSelection}
                                loading = {this.state.isloading} 
                                pagination={{
                                    current:this.state.personnelWaitingOffset / this.state.personnelWaitingLimited + 1,
                                    total:this.state.personnelWaitingTotal,
                                    hideOnSinglePage:true,
                                    showQuickJumper:true,
                                    showSizeChanger:true,
                                    onChange:this.onPageChaneg,
                                    onShowSizeChange:this.onShowSizeChange,
                                    pageSizeOptions:['10', '20', '30', '40'],
                                    
                                }}
                                scroll={{ y: 380}}
                            />
                        </Col>
                    </Row>
                </Card>
                <Card className='already' title='已进场员工信息' bordered={false} >
                    <Row gutter={16} className='personnel-row'>
                        <Col span={6}>
                            <SearchTree
                                className='personnel-tree'
                                data={this.props.projectInfo}
                                onSelect={(key, e) => {}}
                            />
                        </Col>
                        <Col span={18}>
                            <Row gutter={8} className='personnel-row personnel-row-bottom'>
                                <Col span={5}>
                                    <Select defaultValue="全部岗位" onChange={this.handleChange}>
                                        <Option value="全部岗位">全部岗位</Option>
                                        <Option value="项目经理">项目经理</Option>
                                        <Option value="质量员">质量员</Option>
                                        <Option value="安全员">安全员</Option>
                                    </Select>
                                </Col>
                                <Col span={5}>
                                    <Select defaultValue="全部年龄" onChange={this.handleChange}>
                                        <Option value="全部年龄">全部年龄</Option>
                                        <Option value="16-30">16-30</Option>
                                        <Option value="31-40">31-40</Option>
                                        <Option value="41-50">41-50</Option>
                                        <Option value="51-55">51-55</Option>
                                        <Option value="55以上">55以上</Option>
                                    </Select>
                                </Col>
                                <Col span={5}>
                                    <Select defaultValue="全部性别" onChange={this.handleChange}>
                                        <Option value="全部性别">全部性别</Option>
                                        <Option value="男">男</Option>
                                        <Option value="女">女</Option>
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Input placeholder='请输入姓名...' />
                                </Col>
                                <Col span={1}>
                                    <Button type='primary'>搜索</Button>
                                </Col>

                            </Row>
                            <BasicTable 
                                rowKey={record => record.id }
                                columns={this.state.personnelAlreadyColumns} 
                                dataSource={this.state.personnelAlreadyDataSource}
                                loading = {this.state.isloading} 
                                pagination={{
                                    current:this.state.personnelAlreadyOffset / this.state.personnelAlreadyLimited + 1,
                                    total:this.state.personnelAlreadyTotal,
                                    hideOnSinglePage:true,
                                    showQuickJumper:true,
                                    showSizeChanger:true,
                                    onChange:this.onPageChaneg,
                                    onShowSizeChange:this.onShowSizeChange,
                                    pageSizeOptions:['10', '20', '30', '40']
                                }}
                                scroll={{ y: 380 }}
                            />
                        </Col>
                    </Row>
                </Card>
                <Modal
                    title="新增劳务员工信息"
                    content={this.state.deleteArticleModelContent}
                    visible={this.state.addModelShow}
                    confirmLoading={this.state.confirmLoading}
                    onOk={this.saveInfo}
                    onCancel={this.hideAddModel}
                    maskClosable='false'
                    width={800}
                    footer={null}
                >
                   <Tabs defaultActiveKey="1" className='employee-taps'>
                        <TabPane tab="员工基本信息" key="1">
                           <BasicForm
                                formlist={basicInfomation}
                            />
                        </TabPane>
                        <TabPane tab="员工扩展信息" key="2">
                            <BasicForm
                                formlist={basicInfomation}
                            />
                        </TabPane>
                        <TabPane tab="员工工作信息" key="3">
                            <BasicForm
                                formlist={basicInfomation}
                            />
                        </TabPane>
                        <TabPane tab="资格证书信息" key="4">
                            <BasicForm
                                formlist={basicInfomation}
                            />
                        </TabPane>
                        <TabPane tab="社会关系信息" key="5">
                            <BasicForm
                                formlist={basicInfomation}
                            />
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}
 
export default Personnel