import React, { Component } from 'react'
import { Tree, Input, Icon  } from  'antd'
import './searchTree.less'
const { Search } = Input
const { TreeNode } = Tree

class Personnel extends Component {
    
    constructor(props) {
        super(props)

        this.state = { 
            dataList:[],
            expandedKeys: [],
            searchValue: null,
            autoExpandParent: true
        }
    }

    renderTreeNodes = (data, dataList=[]) => {
        return (
            data.map(node => {
                dataList.push({
                    title: node.title,
                    key: node.key
                })
                const index = node.title.indexOf(this.state.searchValue?this.state.searchValue:null)
                const beforeStr = node.title.substr(0, index)
                const afterStr = node.title.substr(index + (this.state.searchValue||'').length)
                const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{ color: '#ff0000' }}>{this.state.searchValue}</span>
                        {afterStr}
                    </span>
                    
                ) : (
                    <span>{node.title}</span>
                )

                if (node.children) {
                    return (
                        node.type === 'company'?
                        <TreeNode 
                            title={title} 
                            key={node.key} 
                            dataRef={node}
                            icon={<Icon type={node.type === 'company'?'folder':'fire'} />}
                        >
                            { this.renderTreeNodes(node.children,dataList)}
                        </TreeNode>
                        :null
                    )
                }
                return <TreeNode 
                        icon={<Icon type={node.type === 'company'?'folder':'fire'} />}
                        selectable={node.type === 'company'?false:true} 
                        title={title} 
                        key={node.key} 
                        value={node.value}
                    />
            })
        )
    }


    onExpand = expandedKeys => {
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        })
    }

    
    getDataList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i]
            const { key } = node
            this.state.dataList.push({ key, title: key })
            if (node.children) {
                this.getDataList(node.children)
            }
        }
    }

    

    render() { 
        const { expandedKeys, autoExpandParent } = this.state
        const dataList = []

        const getParentKey = (key, tree) => {
            let parentKey
            for (let i = 0; i < tree.length; i++) {
                const node = tree[i]
                if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children)
                }
                }
            }
            return parentKey
        }

        const onChange = e => {
            const expandedKeys = dataList
                .map(item => {
                    if (item.title.indexOf(e.target.value?e.target.value:null) > -1) {
                        return getParentKey(item.key, this.props.data)
                    }
                    return null
                })
                .filter((item, i, self) => item && self.indexOf(item) === i)
            this.setState({
                expandedKeys,
                autoExpandParent: true,
                searchValue:e.target.value
            })
        } 
        
        return (  
            <div className={'search-tree'}>
                <Search 
                    style={{ marginBottom: 8 }} 
                    placeholder="请输入" 
                    onChange={ onChange } 
                />
                <Tree
                    className={'hide-file-icon'}
                    showIcon
                    treeDefaultExpandAll
                    // showLine
                    // onChange={selectChange}
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    style={{
                        overflow: 'auto',
                        height:'320px',
                        // background:'#000000',
                        // color:'#ffffff'
                    }}
                >
                    { this.renderTreeNodes(this.props.data, dataList) }
                </Tree>
            </div>
        )
    }
}
 
export default Personnel