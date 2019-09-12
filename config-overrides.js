/**
 * 基于customize和react-app-rewired的定制化配置文件
 */

//  从customize-cra引入一些相关的方法
const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra')
const modifyVars = require('./lessVars');
const path = require('path')

module.exports = override(
    addLessLoader({
        javascriptEnabled:true,
        modifyVars
    }),
    fixBabelImports('import', {
  		libraryName: 'antd',
  		libraryDirectory: 'es',
  		style: true
    }),
    addDecoratorsLegacy(),
    addWebpackAlias({               
        ['@'] : path.resolve(__dirname, './src') 
    })
)