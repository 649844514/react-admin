import React, { Component } from 'react'
import { Table } from  'antd'


class BasicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Table 
                {...this.props}
            />
        );
    }
}
 
export default BasicTable;