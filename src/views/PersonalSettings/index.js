import React, { Component } from 'react'
import { Card, Input, Button, List } from 'antd'
import { connect }  from 'react-redux'
import { changeInputValue } from '../../actions/personalsettings'

const mapState = state => {
    const { inputValue, list } = state.personalsettings
    return  { inputValue, list }
}

@connect(mapState, { changeInputValue })
class PersonalSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.changeValue = this.changeValue.bind(this)
    }

    changeValue = (e) => {
        console.log(e.target.value)
        this.props.changeInputValue(e.target.value)
    }

    render() {
        return ( 
            <Card title='个人设置' bordered={false}>
                <Input 
                    placeholder={this.props.inputValue} 
                    style={{width:'250px'}}
                    onChange={this.changeValue} 
                />
                <Button type='primary'>增加</Button>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}
 
export default PersonalSettings;