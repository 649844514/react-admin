import React, { Component } from 'react'
import { Row, Col, Icon, Card } from 'antd'
// import { Pie, yuan, ChartCard } from 'ant-design-pro/lib/Charts'
// import NumberInfo from 'ant-design-pro/lib/NumberInfo'
import { HeaderBox, BasicTable } from '../../components'
import { getActiveUsers } from '../../requests'
import numeral from 'numeral'
import './xpphome.less'
import img from './default_map.png'

const titliDisplayMap = {
    id:'id',
    rangking:'排行',
    systemName:'系统名称',
    amount:'用户数',
    gain:'周涨幅'
}

// const salesPieData = [
//     {
//       x: '家用电器',
//       y: 4544,
//     },
//     {
//       x: '食用酒水',
//       y: 3321,
//     },
//     {
//       x: '个护健康',
//       y: 3113,
//     },
//     {
//       x: '服饰箱包',
//       y: 2341,
//     },
//     {
//       x: '母婴产品',
//       y: 1231,
//     },
//     {
//       x: '其他',
//       y: 1231,
//     },
//   ];

class Xpphome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:false,
            activeUsersDataSource : [],
            activeUsersColumns : [],
            activeUsersTotal:0,
            activeUsersOffset:0,
            activeUsersLimited:5
        }
    }

    createColumns = (columnKeys) => {
        columnKeys = columnKeys.slice(1)
        const columns = columnKeys.map(item => {
            if(item === 'rangking'){
                return  {
                    title: titliDisplayMap[item],
                    dataIndex: item,
                    key: item,
                    width: 80
                }
            }else if(item === 'amount'){
                return  {
                    title: titliDisplayMap[item],
                    key: item,
                    render:(record)=>{
                        const { amount } = record
                        return numeral(amount).format('0,0')
                    }
                }
            }else if(item === 'gain'){
                return {
                    title: titliDisplayMap[item],
                    key: item,
                    render:(record)=>{
                        const { gain } = record
                        return (
                            gain === 0?
                            <div><div style={{width:'40px',textAlign:'center',display:'inline-block'}}>{gain}%</div><Icon type="dash" /></div>:
                            gain>0?
                            <div><div style={{width:'40px',textAlign:'center',display:'inline-block'}}>{gain}%</div><Icon type="arrow-up" style={{color:'#008000'}} /></div>:
                            <div><div style={{width:'40px',textAlign:'center',display:'inline-block'}}>{-gain}%</div><Icon type="arrow-down" style={{color:'#ff0000'}} /></div>
                            
                        )
                    }
                }
            }else{
                return  {
                    title: titliDisplayMap[item],
                    dataIndex: item,
                    key: item
                }
            }
        })
        return columns
    }

    getActiveUsersList = () => {
        this.setState({
            isloading:true
        })
        let offset = this.state.activeUsersOffset
        let limited = this.state.activeUsersLimited
        getActiveUsers(offset,limited)
            .then(resp => {
                const columnKeys = Object.keys(resp.list[0])
                const columns = this.createColumns(columnKeys)
                if(!this.updater.isMounted(this)) return
                this.setState({
                    activeUsersDataSource:resp.list,
                    activeUsersTotal:resp.total,
                    activeUsersColumns:columns
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

    componentDidMount(){
        this.getActiveUsersList()  
    }
    
    render() { 
        const differentComponnet1 = (
            <Row gutter={16} className='xpphome-header-different'>
                <Col span={12}>
                    <label>周同比</label>
                    <Icon type="caret-up" style={{color:'#008000', marginLeft:'16px', marginRight:'8px'}}  />
                    <span>12%</span>
                </Col>
                <Col span={12}>
                    <label>日环比</label>
                    <Icon type="caret-down" style={{color:'#ff0000', marginLeft:'16px',  marginRight:'8px'}} />
                    <span>11%</span>
                </Col>
            </Row>
        )
        return (
            <div id='xpphome'>
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <HeaderBox 
                                topTitle={'注册用户数据量'}
                                topValue={'126560'}
                                prompt={'注册用户数据量'}
                                differentComponnet={differentComponnet1}
                                bottomTitle={'日均注册用户量'}
                                bottomValue={ numeral(12423).format('0,0') }
                            />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <HeaderBox 
                                topTitle={'访问量'}
                                topValue={'8846'}
                                prompt={'访问量'}
                                differentComponnet={differentComponnet1}
                                bottomTitle={'日访问量'}
                                bottomValue={ numeral(12423).format('0,0') }
                            />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <HeaderBox 
                                topTitle={'注册用户数据量'}
                                topValue={'126560'}
                                prompt={'注册用户数据量'}
                                differentComponnet={differentComponnet1}
                                bottomTitle={'平均日点击量'}
                                bottomValue={ numeral(1240).format('0,0') }
                            />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <HeaderBox 
                                topTitle={'各系统购买率'}
                                topValue={'78%'}
                                prompt={'各系统购买率'}
                                differentComponnet={differentComponnet1}
                                bottomTitle={'各系统购买率'}
                                bottomValue={'66%'}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop:'20px'}}>
                    <Col  span={12}>
                        <Card title='用户日活量' bordered={false}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={12}>
                                    <div className="gutter-box">
                                        <HeaderBox 
                                            topTitle={'当日活跃用户量'}
                                            topValue={'8846'}
                                            prompt={'当日活跃用户量'}
                                        />
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <div className="gutter-box">
                                        <HeaderBox 
                                            topTitle={'当日登录用户量'}
                                            topValue={'2.7'}
                                            prompt={'当日登录用户量'}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{marginTop:'20px'}}>
                                <BasicTable 
                                    rowKey={record => record.id }
                                    columns={this.state.activeUsersColumns} 
                                    dataSource={this.state.activeUsersDataSource}
                                    loading = {this.state.isloading} 
                                    pagination={{
                                        current:this.state.activeUsersOffset / this.state.activeUsersLimited + 1,
                                        total:this.state.activeUsersTotal,
                                        hideOnSinglePage:true,
                                        showQuickJumper:true,
                                        showSizeChanger:true,
                                        onChange:this.onPageChaneg,
                                        onShowSizeChange:this.onShowSizeChange,
                                        pageSizeOptions:['5', '10']
                                    }}
                                />
                            </Row>
                        </Card>
                    </Col>
                    <Col  span={12}>
                        <Card title='各端使用占比' bordered={false}>
                            {/* <Pie
                                hasLegend
                                title="销售额"
                                subTitle="销售额"
                                total={() => (
                                    <span
                                        dangerouslySetInnerHTML={{
                                        __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                                        }}
                                    />
                                )}
                                data={salesPieData}
                                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                                height={294}
                            /> */}
                            {/* <ChartCard title="搜索用户数量" total={numeral(8846).format('0,0')} contentHeight={134}>
                                <NumberInfo
                                    subTitle={<span>本周访问</span>}
                                    total={numeral(12321).format('0,0')}
                                    status="up"
                                    subTotal={17.1}
                                />
                                <MiniArea line height={45} data={visitData} />
                            </ChartCard> */}
                            <div className='transparent-box'>
                                <img className='img' src={img} alt='error' width='200' height='200'/>
                            </div>
                            
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
 
export default Xpphome;