import React, { Component, createRef } from 'react';
import { Card, TreeSelect, Icon, Row, Col, Carousel, Spin } from 'antd'
import { connect } from 'react-redux'
import echarts from 'echarts'
import { getProject, changerProject } from '../../actions/home'
import { getSevendata } from '../../requests'
import './home.less'


const { TreeNode } = TreeSelect;

const mapState = (state) => {
    const { projectValue, projectInfo, isLoading, sevendata, sevendataLoading } = state.home
    return { projectValue, projectInfo, isLoading, sevendata, sevendataLoading }
}

@connect(mapState, { getProject, changerProject })
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.sevenData = createRef()
    }

    onChange = value => {
        this.props.changerProject(value)
    }

    getTreeNode = (node) => {
        return (
            <TreeNode 
                icon={<Icon type={node.type === 'company'?'folder':'fire'} />}
                selectable={node.type === 'company'?false:true} 
                title={node.title} 
                key={node.key} 
                value={node.value}
            
            >
                {
                     
                     (node.children||[]).map(childrenNode => {
                         if(childrenNode.type === 'company'){
                            return this.getTreeNode(childrenNode)
                         }else{
                             return (
                                <TreeNode 
                                    icon={<Icon type={childrenNode.type === 'company'?'folder':'fire'} />} 
                                    selectable={childrenNode.type === 'company'?false:true} 
                                    title={childrenNode.title} 
                                    key={childrenNode.key} 
                                    value={childrenNode.value} >
                                </TreeNode>
                             )
                         }
                        
                     })
                }
            </TreeNode>
        )
    }

    getProjectArr = () => {
        var projectArr = [],arr = []
        if(this.props.projectInfo.length>0){
            this.props.projectInfo.map(node => {
                arr.push(node)
                if(arr.length === 4){
                    arr.key = Math.random()
                    projectArr.push(arr)
                    arr = []
                }
                return projectArr
            })
            var lastArr = this.props.projectInfo.slice(-(this.props.projectInfo.length%4))
            lastArr.key = Math.random()
            projectArr.push(lastArr)
            return projectArr
        }
        return projectArr
    }

    initSevenData = (data) => {
        const option = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:data.map(item => item.name)
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : data[0].amount.map(item => item.days)
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:data[0].name,
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:data[0].amount.map(item => item.value)
                },
                {
                    name:data[1].name,
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:data[1].amount.map(item => item.value)
                },
                {
                    name:data[2].name,
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:data[2].amount.map(item => item.value)
                },
                {
                    name:data[3].name,
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:data[3].amount.map(item => item.value)
                },
                {
                    name:data[4].name,
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:data[4].amount.map(item => item.value)
                }
            ]
        }
        this.sevenDataEchart.setOption(option)
        
    }

    componentDidMount(){
        this.props.getProject()
        this.sevenDataEchart = echarts.init(this.sevenData.current)
        getSevendata()
            .then(resp => {
                this.initSevenData(resp.list)
            })
        
    }

    render() { 
        const projectArr = this.getProjectArr()
        return (
            <div className='home'>
                <Card title='概览' bordered={false} className='top-card' >
                    <Spin spinning={this.props.isLoading}>
                        选择项目：
                        <TreeSelect
                            placeholder='Please select'
                            showLine
                            showSearch
                            searchPlaceholder='Please input'
                            style={{ width: 300 }}
                            value={this.props.projectValue}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeIcon
                            treeDefaultExpandAll
                            onChange={this.onChange}
                            onSelect={this.onSelect}
                        >
                            {
                                this.props.projectInfo.map(node => {
                                    return this.getTreeNode(node)
                                })
                            }
                        </TreeSelect>
                    </Spin>
                    <Carousel autoplay dots>
                        {
                            projectArr.map(nodeList => {
                                return (
                                    <Row gutter={16} className='top-row' key={nodeList.key} >
                                        {
                                            nodeList.map((node,index) => {
                                                return (
                                                    <Col className='gutter-row' span={6} key={node.key} >
                                                        <div className={'gutter-box box-'+(index+1)}>{node.title}</div>
                                                    </Col>
                                                )
                                            })
                                        }   
                                    </Row>
                                )
                            })
                        }
                    </Carousel>
                </Card>
                <Card title='最近一周数量' bordered={false} className='seven-card' >
                    <div ref={this.sevenData} className='seven-echart' />
                </Card>
            </div>  
        );
    }
}
 
export default Home;