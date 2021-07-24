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
                resolve(p, x, resolve, reject)
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
                resolve(p, x, resolve, reject)
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
          const x = onFulfilled(that.value)
          resolvePromise(p, x, resolve, reject)
        }
        return
      }

      if (that.state === 'REJECTED') {
        if (typeof onRejected === 'function') {
          const x = onRejected(that.reason)
          resolvePromise(p, x, resolve, reject)
        }
      }
    })

    return p
  }

  catch(onRejected) {
    return this.then(null, onRejected)
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