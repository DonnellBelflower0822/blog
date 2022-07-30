const path = require('path')
const babylon = require('babylon')
const types = require('@babel/types')
const generator = require('@babel/generator').default
const traverse = require('@babel/traverse').default

const parser = (source, parentPath) => {
    // 依赖
    const dependencises = []
    // 转换
    const ast = babylon.parse(source, { sourceType: 'module' })
    traverse(ast, {
        CallExpression(p) {
            // 改写require
            const { node } = p
            if (node.callee.name === 'require') {
                // console.log(node)
                // 把 require 改成 __webpack_require__
                node.callee.name = '__webpack_require__'

                // 获取文件名, 此处是路径是相对于当前文件的路径
                let moduleName = node.arguments[0].value
                // 补全后缀
                moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
                // 补全前缀
                moduleName = './' + path.join(parentPath, moduleName)

                // 收集依赖
                dependencises.push(moduleName)

                node.arguments = [types.stringLiteral(moduleName)]
            }
        }
    })

    const sourceCode = generator(ast).code

    return {
        sourceCode,
        dependencises
    }
}

exports.parser = parser
