# 模块化编程

## 什么是模块？

- 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起；
- 块的内部数据/实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信；
- 一个模块的组成
  - 数据--->内部的属性；
  - 操作数据的行为--->内部的函数；
- 模块化是指解决一个复杂的问题时自顶向下把系统划分成若干模块的过程，有多种属性，分别反映其内部特性；
- 模块化编码：编码时是按照模块一个一个编码的, 整个项目就是一个模块化的项目；

## 模块化优点

- 更好代码组织方式，利于后期维护
- 按需加载
- 避免命名冲突
- 更好的依赖处理
- 更好的分离

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

### ES6 MODULE

```js
// index.js
import math, { desc } from './math'
console.log(math, desc)

// math.js
export default {
  getSum: (a, b) => a + b
}

export function desc(a, b) {
  return a - b
}
```
