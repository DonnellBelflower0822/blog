# 异步编程

## 任务
- event loop
- 解决方案
  - 回调
  - Promise
  - generoter
  - async/await
- 手写
  - 手写Promise
  - 手写async/await

## 回调

> 回调地狱

```js
function wait(cb) {
  setTimeout(() => {
    cb()
  }, 1000)
}

wait(() => {
  // do some thing
  wait(() => {
    // do some thing
  })
})
```

## Promise

### 特点
- 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
- 一旦状态改变，就不会再变

### 缺点
- 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于pending状态时，无法得知目前进展到哪一个阶段

### 使用-同步任务

```js
const p = new Promise((resolve, reject) => {
  resolve(100)
})

p.then(res => {
  console.log(res)
})
```

### 异步任务

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000);
})

p.then(res => {
  console.log(res)
})
```
### 链式调用

```js
function readFile(filename) {
  return new Promise((resolve, reject) => {
  })
}

readFile('name')
  .then(
    data => {
      // 返回promise
      return readFile(data + '-age')
    }
  )
  .then(
    data => {
      console.log(1, data)
      // 返回普通值
      return 100
    },
    (e) => {
      console.log(2, e)
      // 返回undefined
    }
  )
  .then(
    data => {
      console.log(3, data)
      // 没有返回值,默认会返回undefined
    }
  )
  .then(
    data => {
      console.log(4, data)
      // 抛出错误
      throw new Error('')
    }
  )
  .then(
    data => {
      console.log(5, data)
    },
    e => {
      console.log(6, e)
    }
  )
```

### catch
```js
readFile().catch(e => {
  console.log(e)
})
```

### Promise.all
```js
Promise
  .all([readFile('name'), readFile('age'), 1])
  .then(data => {
    console.log(data)
  }, error => {
    console.log(error)
  })
```

### Promise.rece
```js
Promise
  .race([readFile('name'), readFile('age'), 1, 2])
  .then(data => {
    console.log(data)
  }, error => {
    console.log(error)
  })
```

### 其他用法
```js
Promise.resolve()
Promise.reject()
```

## 手写Promise
```js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环调用'))
  }

  // 普通值, 走resolve
  if (x === null || (typeof x !== 'object' && typeof x !== 'function')) {
    return resolve(x)
  }

  let called
  try {
    const { then } = x
    if (typeof then !== 'function') {
      // 普通对象
      if (!called) {
        called = true
        resolve(x)
      }
      return
    }

    // 返回的是一个promise
    then.call(
      x,
      (value) => {
        if (!called) {
          called = true
          resolve(value)
        }
      },
      (reason) => {
        if (!called) {
          called = true
          reject(reason)
        }
      }
    )
  } catch (e) {
    if (!called) {
      called = true
      reject(e)
    }
  }
}

class Promise {
  constructor(executor) {
    // 状态
    this.state = PENDING

    // 成功的值
    this.value = undefined

    // 失败的原因
    this.reason = undefined

    // 成功的回调
    this.onFulfilledCallbacks = []

    // 失败的回调
    this.onRejectedCallbacks = []

    // 处理成功回调
    const onResolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => {
          fn()
        })
      }
    }

    // 处理失败回调
    const onReject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason
        this.state = REJECTED
        this.onRejectedCallbacks.forEach(fn => {
          fn()
        })
      }
    }

    try {
      executor(onResolve, onReject)
    } catch (e) {
      onReject(e)
    }
  }

  then(onFulfilled, onRejected) {
    const that = this
    const p = new Promise((resolve, reject) => {
      if (that.state === 'PENDING') {
        if (typeof onFulfilled === 'function') {
          that.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                const x = onFulfilled(that.value)
                resolvePromise(p, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
        }

        if (typeof onRejected === 'function') {
          that.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                const x = onRejected(that.reason)
                resolvePromise(p, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
        }
        return
      }

      if (that.state === 'FULFILLED') {
        if (typeof onFulfilled === 'function') {
          try{
            const x = onFulfilled(that.value)
            resolvePromise(p, x, resolve, reject)
          }catch(e){
            reject(e)
          }
        }
        return
      }

      if (that.state === 'REJECTED') {
        if (typeof onRejected === 'function') {
          try{
            const x = onRejected(that.reason)
            resolvePromise(p, x, resolve, reject)
          }catch(e){
            reject(e)
          }
        }
      }
    })

    return p
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    // 无论成功或失败都会走
    // 走完finally, 
    // 1. 进入finally之前是成功态后续还是成功态,值还是原来的值
    // 2. 进入finally之前是失败态后续还是失败态,值还是原来的值
    return this.then(
      value => Promise.resolve(callback()).then(() => value),
      reason => {
        return Promise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const result = []
    let count = 0
    function handleResolve(value, index) {
      result[index] = value
      count += 1
      if (count === promises.length) {
        resolve(result)
      }
    }
    promises.forEach((p, index) => {
      if (!p instanceof Promise) {
        handleResolve(p, index)
        return
      }

      p.then(
        (value) => {
          handleResolve(value, index)
        },
        (e) => {
          reject(e)
        }
      )
    })
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      if (!p instanceof Promise) {
        resolve(p)
        return
      }

      p.then(resolve, reject)
    })
  })
}

Promise.resolve = function (value) {
  return new Promise(resolve => {
    resolve(value)
  })
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
```

## Generator

### 基础用法

**调用fn不会执行函数内部代码**

```js
function* fn() {
  console.log('hello')
}

// 执行fn返回遍历器.
// 此时不会输出hello
const generator = fn()
console.log(generator)
```

**基础执行流程**
```js
function* fn() {
  console.log('hello')
  const a = yield 'aa'
  console.log(a)
  const b = yield 'bb'
  console.log(b)
  return 'end'
}

// 返回迭代器
const generator = fn()

/**
 * 执行语句
 * console.log('hello')
 * yield 'aa'
 * result0 = {value: 'aa', done:false}
 */
const result0 = generator.next(1)
console.log(result0)

/**
 * 执行语句
 * a = 2
 * console.log(a)
 * yield 'bb'
 * result1 = {value:'bb',done:false}
 */
const result1 = generator.next(2)
console.log(result1)

/**
 * 执行语句
 * b = 3
 * console.log(b)
 * // 如果有return的值作为result2.value
 * // 如果没有return, result2.value 为undefined
 * result2 = {value:'end',done:true}
 */
const result2 = generator.next(3)
console.log(result2)
```

### 异步应用
```js
function wait(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

function* gen() {
  const a = yield wait('hello')
  const b = yield wait('world')
  console.log(a, b)
}

const g = gen()

// g.next().value 返回其实就是wait('hello'), 也就是promise
g.next().value.then(data => {
  // g.next(data).value
  // 1. 将wait('hello')的结果给到 a
  // 2. 执行wait('world')
  // g.next(data).value也是一个promise
  g.next(data).value.then(data => {
    // 1. 将wait('world')的结果给到 b
    // 2. 执行console.log(a,b)
    g.next(data)
  })
})
```

### 改成自动执行

> 自动调用

```js

function* gen() {
  const a = yield wait('hello')
  const b = yield wait('world')
  console.log(a, b)
}

function co(gen) {
  // 生成一个迭代器
  const g = gen()

  function next(data) {
    // 执行next
    const result = g.next(data)

    // 如果结束
    if (result.done) {
      return result.value
    }

    // 没有执行结束, 就处理primose
    result.value.then(data => {
      // 将promise的结果给到上一个yield的左边变量
      next(data)
    })
  }

  next()
}

co(gen)
```

## async
> 它就是 Generator 函数的语法糖。

```js
function wait(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

async function fn() {
  console.log('hello')
  const a = await wait('aa')
  console.log(a)
  const b = await wait('bb')
  console.log(b)
  return 'end'
}

fn()
```

### async和generator的区别

- 执行器
  - Generator 函数的执行必须靠执行器,需要依赖co才能自动执行
  - async函数自带执行器, 自动执行
- 语义化
  - async
    - async表示函数有异步操作
    - await表示后续代码等待结果
- 适用性
  - async
    - 后面可以接Promise,thunk,原始值(会被Promise.resolve)
  - genertor
    - 后面只能接Promise,thunk
- 返回值
  - async: 返回promise



