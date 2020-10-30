import React, { Component } from 'react'
import { Row, Col, Statistic, Icon, Tooltip } from 'antd'

class HeaderBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
            <div>
                <Row gutter={24}>
                    <Col span={20}>
                        <Statistic title={this.props.topTitle} value={this.props.topValue} />
                    </Col>
                    <Col span={4} style={{textAlign:'center'}}>
                        <Tooltip placement="top" title={this.props.prompt}>
                            <Icon type="info-circle" />
                        </Tooltip>
                        
                    </Col>
                </Row>
                {this.props.differentComponnet}
                <Row gutter={24}>
                    <Col span={8}>
                        {this.props.bottomTitle}
                    </Col>
                    <Col span={16}>
                        {this.props.bottomValue}
                    </Col>
                </Row>
            </div>  
        );
    }
}
 
export default HeaderBox;