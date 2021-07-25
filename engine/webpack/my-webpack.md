# 手写webpack

## 前期准备工作

### package.json

```json
{
  "bin": {
    "my-pack": "./bin/index.js"
  },
}
```

### 链接到全局

```shell
npm link
```

### bin文件开头

> 标记为node执行

```
#! /usr/bin/env node
```

## 正式流程

```js
#! /usr/bin/env node

const path = require('path')
const Compiler = require('../lib/Compiler')

// 获取webpack.config.js
const config = require(path.resolve('webpack.config.js'))

// 编译
const compiler = new Compiler(config)

// 初始化配置
compiler.hooks.entryOption.call()

// 编译且生成文件
compiler.run()
```

### Compiler

```js
const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const types = require('@babel/types')
const generator = require('@babel/generator').default
const traverse = require('@babel/traverse').default
const template = require('./template')
const SyncHook = require('../hook/SyncHook')

class Compiler {
  constructor(config) {
    this.config = config
    // 入口文件路径
    this.entryId
    // 保存所有模块依赖
    this.modules = {}

    // 入口
    this.entry = config.entry
    // 工作路径
    this.root = process.cwd()

    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    }

    // 执行plugins，将钩子挂载到this.hooks上
    const { plugins } = config
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        plugin.apply(this)
      })
    }

    this.hooks.afterPlugins.call()
  }

  // 获取文件内容，使用loader进行处理
  getSource(modulePath) {
    const { rules } = this.config.module

    let content = fs.readFileSync(modulePath, 'utf8')

    for (let i = 0;i < rules.length;i += 1) {
      const rule = rules[i];
      const { test, use } = rule

      // loader的执行顺序是从右到左，从下往上
      let len = use.length - 1
      if (test.test(modulePath)) {
        function normalLoader() {
          const loader = require(use[len])
          content = loader(content)
          len -= 1
          if (len >= 0) {
            normalLoader()
          }
        }
        normalLoader()
      }

    }

    return content
  }

  // 构建module
  buildModule(modulePath, isEntry) {
    // 获取文件内容
    const source = this.getSource(modulePath)
    // ./src/xx/x.js
    const moduleName = './' + path.relative(this.root, modulePath)

    if (isEntry) {
      this.entryId = moduleName
    }

    const { sourceCode, dependencises } = this.parse(source, path.dirname(moduleName))

    this.modules[moduleName] = sourceCode

    dependencises.forEach(dep => {
      this.buildModule(path.join(this.root, dep), false)
    })
  }

  // 将require改成__webpack_require__
  parse(source, parentPath) {
    const ast = babylon.parse(source)
    const dependencises = []

    traverse(ast, {
      CallExpression(p) {
        const { node } = p
        if (node.callee.name === 'require') {
          // 把 require 改成 __webpack_require__
          node.callee.name = '__webpack_require__'

          let moduleName = node.arguments[0].value

          // 补后缀
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')

          // 加 ./ 和src
          moduleName = './' + path.join(parentPath, moduleName)

          dependencises.push(moduleName)

          node.arguments = [types.stringLiteral(moduleName)]
        }
      }
    })

    const sourceCode = generator(ast).code

    return { sourceCode, dependencises }
  }

  // 生成文件
  emitFile() {
    const main = path.join(
      this.config.output.path,
      this.config.output.filename,
    )

    const code = template({
      entryId: this.entryId,
      modules: this.modules
    })

    this.assets = {}
    this.assets[main] = code
    fs.writeFileSync(main, this.assets[main])
  }

  // 整个执行流程
  run() {
    this.hooks.run.call()
    this.hooks.compile.call()
    this.buildModule(
      path.resolve(this.root, this.entry),
      true
    )

    this.hooks.afterCompile.call()

    // 生成文件
    this.emitFile()
    this.hooks.emit.call()
    this.hooks.done.call()
  }
}

module.exports = Compiler
```

### 生成文件的模板

```js
const template = `
  (() => {
    var __webpack_modules__ = ({${webpackModules}});
    var __webpack_module_cache__ = {};

    function __webpack_require__(moduleId) {
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = __webpack_module_cache__[moduleId] = {
        exports: {}
      };

      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

      return module.exports;
    }

    var __webpack_exports__ = __webpack_require__("${entryId}");
  })()
`
```

## 自定义loader

### less-loader

```js
const less = require('less')
function loader(source) {
  let css = ''
  less.render(source,(err,c)=>{
    css = c.css
  })

  return css
}

module.exports = loader
```

### style-loader

```js
function loader(source) {
  console.log(source)
  const style = `
    const style = document.createElement('style');
    style.innerHTML = '${source.replace(/\"/g,'').replace(/\n/g,'')}';
    document.head.appendChild(style);
  `

  return style
}

module.exports = loader
```

## 自定义plugins

