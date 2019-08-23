import React, { useReducer } from 'react';
import { Card, Button } from 'antd'

function Settings(){
    const ADD = 'ADD' 
    const SUB = 'SUB'
    const [ count, dispatch ] = useReducer((state,action)=>{
        switch(action.type){
            case ADD:
                return state+1
            case SUB:
                return state-1
            default:
                return state
        }
    },0)
    return (  
        <Card title='个人设置' bordered={false} >
            <h2>{count}</h2>
            <Button onClick={()=>dispatch({type:ADD})}>Add</Button>
            <Button onClick={()=>dispatch({type:SUB})}>Sub</Button>
        </Card>
    )
}
 
export default Settings;