import React, { Component } from 'react';
import { Card, Spin, List, Avatar, Badge, Button } from 'antd'
import { connect } from 'react-redux'
import { markNotificationAsReadById, markAllNotificationsAsRead } from '../../actions/notification'
import './notification.less'

const mapState = (state) => {
    const { isLoading, list} = state.notification
    return { isLoading, list }
} 


@connect(mapState, { markNotificationAsReadById, markAllNotificationsAsRead })
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading} >
                <Card 
                    title='通知中心' 
                    bordered={false} 
                    extra={
                        <Button 
                            disabled={this.props.list.every(item => item.hasRead===true)}
                            onClick={this.props.markAllNotificationsAsRead}>
                            全部标记为已读
                        </Button>
                    }
                    className='notification-card' 
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        // pagination={{
                        //     pageSize: 10
                        // }}
                        renderItem={item => (
                            <List.Item 
                                extra={
                                    item.hasRead ? null :
                                    <Button 
                                        onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>
                                        标记为已读                                
                                    </Button>
                                }>
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={
                                    <Badge dot={!item.hasRead}>
                                        {item.title}
                                    </Badge>
                                }
                                description={item.desc}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>  
        );
    }
}
 
export default Notification;