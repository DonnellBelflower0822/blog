# 模块化编程

## 什么是模块？

> 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起；

## 模块化优点

- 更好`代码组织`方式，利于后期`维护`
- `按需加载`
- 避免`命名冲突`
- 更好的`依赖处理`
- 更好的`分离`

## 模块化

```js
const allenModule = (function () {
  const name = 'allen'
  const sex = 'man'
  return {
    tell() {
      console.log(name, sex)
    }
  }
})()
```

```js
(function (window) {
  const name = 'allen'
  const sex = 'man'
  window.allenModule = {
    tell() {
      console.log(name, sex)
    }
  }
})(window)
```

## 进化史

### AMD

### COMMONJS

- 运行在node环境

> exports和require

```js
// index.js
const a = require('./math')

console.log(a)

const { getSum } = require('./math')
console.log(getSum)

const a2 = require('./math-2')

console.log(a2)

const { desc } = require('./math-2')
console.log(desc)

// math.js
exports.getSum = (a, b) => a + b
exports.desc = (a, b) => a - b

// math-2.js
const getSum = (a, b) => a + b
const desc = (a, b) => a - b

module.exports = {
  getSum,
  desc
}
```

### ES MODULE

```js
// === index.js ===
// 将lib.js的导出全部导出
// all = {a:()=>{},b:()=>{},default:()=>{}}
import * as all from './lib.js'
// 
import { a, c, default as lib } from './lib.js'

// === lib.js ===
// 默认导出
export default function b() { }
// 导出单个
export function a() { }

function c() { }
// 导出单个
export {
    c
}

// 将other里面所有导出
export * from './other.js'
// 把other.js的d用e的名字导出
export { d as e } from './other.js'

// === other.js === 
export function d() { }
```

## 模块加载
### defer/async
- defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；
- async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染

## COMMONJS/ES MODULE

- CommonJS 模块输出的是一个`值的拷贝`，ES6 模块输出的是`值的引用`。
- CommonJS 模块是`运行时`加载，ES6 模块是`编译时`输出接口。
- CommonJS 模块的require()是`同步`加载模块，ES6 模块的import命令是`异步`加载，有一个独立的模块依赖的解析阶段。

### COMMONJS 值拷贝

> 拷贝, 简单类型

```js
// === index.js ===
const mod = require('./lib')

// 基础类型
console.log('base count', mod.count)    // 3
console.log('base countGet', mod.countGet)  // 3

mod.add()

console.log('base count', mod.count)    // 3
console.log('base countGet', mod.countGet)  // 4

// 引用类型
console.log('adv obj', mod.obj) // {a:1}
mod.addObj()
console.log('adv obj', mod.obj) // {a:2}

// === lib.js ===
let count = 3

const obj = { a: 1 }

module.exports = {
    count,
    get countGet() {
        return count
    },
    add() {
        count += 1
    },
    obj,
    addObj() {
        obj.a += 1
    }
}
```

### ES MODULE
```js
// === index.js === 
import { count, add, obj } from "./lib.js";

console.log(count)  // 0
add()
console.log(count)  // 1

// Uncaught TypeError: Assignment to constant variable.
// count = 1

console.log(obj)    // {a:1}
obj.a = 2
console.log(obj)    // {a:2}

// === lib.js === 
export let count = 0

export function add() {
    count += 1
}

export const obj = { a: 1 }
```











