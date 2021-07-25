# 函数式编程

## IIFE:立即调用的函数表达式

> 避免污染全局命名空间

```js
const res = (() => {
  console.log(111)
  return 'hello'
})()

console.log(res)  // hello
```

## 箭头函数
1. 箭头函数没有自己的this对象: 往上找,找到第一个非箭头函数的this
2. 不可以当作构造函数
3. 不可以使用arguments对象
4. 不可以使用yield命令

```js
const fn = () => {
  console.log(this)

  // 在箭头函数里面不能用arguments
  // Uncaught ReferenceError: arguments is not defined
  console.log(arguments)
}

fn(1, 2, 3)

// 不能作为构造函数
// TypeError: fn is not a constructor
new fn()

// 不能使用yield
const a = () => { }
yield a()
```

## 高阶函数

**定义**

- 可以把函数作为参数传递给另一个函数
- 可以把函数作为另一个函数的返回结果

**意义**
- 抽象可以帮我们屏蔽细节，只需要关注与我们的目标
- 高阶函数是用来抽象通用的问题

**常用高阶函数**

- forEach
- map
- filter
- findIndex
- find
- reduce
- sort


```js
// 函数作为参数
const arr = [1, 2, 3, 4]
arr.forEach((item, index) => {
  console.log(item, index)
})

// 将函数作为返回值
function pay() {
  let isPay = false
  return () => {
    if (isPay) {
      return
    }
    console.log('paying')
    isPay = true
  }
}
const payFn = pay()
payFn()
payFn()
```

## 闭包

在执行上下文中详解

> 可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员

> 函数和其周围的状态(词法环境)的引用捆绑在一起形成闭包。

## 纯函数

> 相同的输入永远会得到相同的输出，而且没有任何可观察的副作用

```js
const arr = [1, 2, 3, 4, 5]

// slice是纯函数,相同输入得到相同输出
arr.slice(1, 3)
arr.slice(1, 3)

// splice不是纯函数,相同输入得不到相同输出
arr.splice(1, 2)
arr.splice(1, 2)
console.log(arr)

// 相同输入得到相同结果
function sum(a, b) {
  return a + b
}
// 下面就不是纯函数
function sum(a, b) {
  return a + b + Math.random()
}
```

**好处**
- 可缓存
- 可测试
- 并行处理
  - 在多线程环境下并行操作共享的内存数据很可能会出现意外情况
  - 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数 (Web Worker)

**副作用**

```js
let mini = 18

function checkAge(age) {
  // 此处依赖外部状态
  return age >= mini
}
```

## 柯里化

**定义**

- 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）
- 然后返回一个新的函数接收剩余的参数，返回结果

**案例**

```js
function checkAge(mini) {
  return function (age) {
    return age >= mini
  }
}

const checkAge18 = checkAge(18)
```

### 实现curry函数

```js
function curry(fn) {
  return function f(...args) {
    if (fn.length === args.length) {
      return fn.apply(this, args)
    }

    return function (...extArgs) {
      return f(...args, ...extArgs)
    }
  }
}
```

**使用**

```js
function getSum(a, b, c) {
  return a + b + c
}

const getSumCurry = curry(getSum)

console.log(getSumCurry(1)(2)(3))
console.log(getSumCurry(1, 2)(3))
console.log(getSumCurry(1, 2, 3))
```

**柯里化的总结**

- 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
- 这是一种对函数参数的'缓存'
- 让函数变的更灵活，让函数的粒度更小
- 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能

## 函数组合

> 如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数

> 函数组合默认是从右到左执行

```js
// 组合函数
function compose(f, g) {
  return function (x) {
    return f(g(x))
  }
}
function first(arr) {
  return arr[0]
}
function reverse(arr) {
  return arr.reverse()
}
// 函数数组是从右到左运行
let last = compose(first, reverse)
console.log(last([1, 2, 3, 4]))
```

### lodash.flowRight

```js
const lodash = require('lodash')
const toUpper = s => s.toUpperCase()
const reverse = arr => arr.reverse()
const first = arr => arr[0]
const f = lodash.flowRight(toUpper, first, reverse)
console.log(f(['one', 'two', 'three'])) // "THREE"
```

### 模拟compose

```js
function flowRight(...fns) {
  return (value) => {
    // 倒序
    // 拿到上一个的结果作为当前函数的参数进行执行
    return fns.reduceRight((prevValue, fn) => fn(prevValue), value)
  }
}

function flowRight1(...fns) {
  return fns.reduce((prevFn, currentFn) => (
    (...args) => prevFn(currentFn(...args))
  ))
}
```

