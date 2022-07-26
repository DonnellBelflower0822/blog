type Resolve<T> = (value: T) => void
type Reject = (reason: any) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

type OnFulFilled<T> = (value: T | null) => any
type OnRejected = (reason: any) => any

type Callback = () => void

class MyPromise<T = any> {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'

    public status = MyPromise.PENDING
    public value: T | null = null
    public reason: any = null

    private onFulfilledCallbacks: Callback[] = []
    private onRejectedCallbacks: Callback[] = []

    public constructor(executor: Executor<T>) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    private resolve = (value: T) => {
        if (this.status === MyPromise.PENDING) {
            queueMicrotask(() => {
                this.value = value
                this.status = MyPromise.FULFILLED
                this.onFulfilledCallbacks.forEach(fn => {
                    fn()
                })
            })
        }
    }

    private reject = (reason: any) => {
        if (this.status === MyPromise.REJECTED) {
            queueMicrotask(() => {
                this.reason = reason
                this.status = MyPromise.REJECTED
                this.onRejectedCallbacks.forEach(fn => {
                    fn()
                })
            })
        }
    }

    // 是在微任务时机执行
    // 2.2.1 Both onFulfilled and onRejected are optional arguments:
    // 2.2.1 onFulfilled和onRejected都是可选参数。
    public then = (onFulFilled?: OnFulFilled<T> | any, onRejected?: OnRejected | any) => {
        // Promise 规范如果 onFulfilled 和 onRejected 不是函数，就忽略他们，所谓“忽略”并不是什么都不干，
        // 对于onFulfilled来说“忽略”就是将value原封不动的返回，
        // 对于onRejected来说就是返回reason，onRejected因为是错误分支，我们返回reason应该throw一个Error:

        // 2.2.1.1 If onFulfilled is not a function, it must be ignored.
        // 2.2.1.1 如果onFulfilled不是一个函数，它必须被忽略。
        // 2.2.1.2 If onRejected is not a function, it must be ignored.
        // 2.2.1.2 如果onFulfilled不是一个函数，它必须被忽略。

        // onFulfilled and onRejected must be called as functions (i.e. with no this value). [3.2]
        // onFulfilled和onRejected必须作为函数被调用（即没有这个值）。[3.2]
        const realOnFulFilled: OnFulFilled<T> = typeof onFulFilled === 'function' ? onFulFilled : (value: T) => value
        const realOnRejected: OnRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

        const promise2 = new MyPromise((resolve, reject) => {
            // onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1].
            // onFulfilled或onRejected不能被调用，直到执行上下文栈只包含平台代码。[3.1].
            // 解读: onFulfilled和onRejected需在微任务队列里面执行
            if (this.status === MyPromise.FULFILLED) {
                // If onFulfilled is a function:
                // 如果onFulfilled是一个函数。
                // it must be called after promise is fulfilled, with promise’s value as its first argument.
                // 它必须在承诺实现后被fulfilled，并将promise’s value作为其第一个参数。
                // it must not be called before promise is fulfilled.
                // 它不能在promise状态为fulfilled之前被调用。
                // it must not be called more than once.
                // 它不能被调用超过一次。
                queueMicrotask(() => {
                    try {
                        const x = realOnFulFilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                return
            }

            if (this.status === MyPromise.REJECTED) {
                // If onRejected is a function,
                // 如果onRejected是一个函数。
                // it must be called after promise is rejected, with promise’s reason as its first argument.
                // 它必须在 promise 被rejected后被调用，并以 promise's reason 作为第一个参数。
                // it must not be called before promise is rejected.
                // 它不能在promise被rejected之前被调用。
                // it must not be called more than once.
                // 它不能被调用超过一次。
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                return
            }

            if (this.status === MyPromise.PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const x = realOnFulFilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })

        return promise2
    }

    public catch = (onRejected?: OnRejected) => {
        return this.then(null, onRejected)
    }
}

function resolvePromise<T>(promise2: MyPromise, x: any, resolve: Resolve<T>, reject: Reject) {
    if (x === promise2) {
        // 如果返回的值是当前promise2则报错
        return reject(new TypeError('Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>'))
    }

    if (x instanceof MyPromise) {
        if (x.status === MyPromise.PENDING) {
            x.then(
                (y: any) => {
                    resolvePromise(promise2, y, resolve, reject)
                },
                reject
            )
        } else if (x.status === MyPromise.FULFILLED) {
            resolve(x.value)
        } else if (x.status === MyPromise.REJECTED) {
            reject(x.reason)
        }
        return
    }

    // 非对象或函数
    if (x === null || (typeof x !== 'function' && typeof x !== 'object')) {
        resolve(x)
        return
    }

    // 对象或函数去找到then函数
    let then
    try {
        then = x.then
    } catch (e) {
        return reject(e)
    }

    // then不是函数, 则认为是普通的函数或对象, 直接resolve
    if (typeof then !== 'function') {
        return resolve(x)
    }
    let called = false
    try {
        then.call(
            x,
            (val: any) => {
                if (called) {
                    return
                }
                called = true
                resolvePromise(promise2, val, resolve, reject)
            },
            (reason: any) => {
                if (called) {
                    return
                }
                called = true
                reject(reason)
                // resolvePromise(promise2, reason, resolve, reject)
            }
        )
    } catch (e) {
        if (called) {
            return;
        }
        called = true;
        reject(e);
    }
}

export default MyPromise
