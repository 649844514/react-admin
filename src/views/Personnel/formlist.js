import React from 'react'
import { Input, Select, DatePicker, Cascader } from  'antd'
import  native from './native.js'

const { Option } = Select

const basicSelect = options => {
    return (
        options.map((option, index) => (
            <Option key={index} id={option.id} value={option.value}>
                {option.value}
            </Option>
        ))
    )
}



export const basicInfomation = [{
    label:'姓名',
    name:'user',
    rules: [{ required: true, message: '请输入姓名!' }],
    component:<Input  placeholder="姓名" />
},{
    label:'性别',
    name:'sex',
    component:<Select>{basicSelect([{id:'1',value:'男'}, {id:'1',value:'女'}])}</Select>
},{
    label:'出生日期',
    name:'birthday',
    component:<DatePicker showTime placeholder="选择时间"  />
},{
    label:'民族',
    name:'sex',
    component:<Select>{basicSelect([{id:'',value:'全部民族'}, {id:'1',value:'汉族'}])}</Select>
},{
    label:'籍贯',
    name:'native',
    component: <Cascader options={native} expandTrigger="hover" />
},{
    label:'证件类型',
    name:'cardType',
    component:<Select>{basicSelect([{id:'1',value:'身份证'}, {id:'1',value:'军官证'}])}</Select>
},{
    label:'住址',
    name:'address',
    component:<Input  placeholder="住址" />
},{
    label:'身份证号',
    name:'idCard',
    component:<Input  placeholder="身份证号" />
},{
    label:'签发机关',
    name:'office',
    component:<Input  placeholder="签发机关" />
}]