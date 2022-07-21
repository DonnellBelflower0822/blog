'use strict';

class MyPromise {
    constructor (executor) {
        this.status = MyPromise.PENDING;
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        this.resolve = (value) => {
            if (this.status === MyPromise.PENDING) {
                queueMicrotask(() => {
                    this.value = value;
                    this.status = MyPromise.FULFILLED;
                    this.onFulfilledCallbacks.forEach(fn => {
                        fn();
                    });
                });
            }
        };
        this.reject = (reason) => {
            if (this.status === MyPromise.REJECTED) {
                queueMicrotask(() => {
                    this.reason = reason;
                    this.status = MyPromise.REJECTED;
                    this.onRejectedCallbacks.forEach(fn => {
                        fn();
                    });
                });
            }
        };
        // 是在微任务时机执行
        this.then = (onFulFilled, onRejected) => {
            // Promise 规范如果 onFulfilled 和 onRejected 不是函数，就忽略他们，所谓“忽略”并不是什么都不干，
            // 对于onFulfilled来说“忽略”就是将value原封不动的返回，
            // 对于onRejected来说就是返回reason，onRejected因为是错误分支，我们返回reason应该throw一个Error:
            const realOnFulFilled = typeof onFulFilled === 'function' ? onFulFilled : (value) => value;
            const realOnRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };
            const promise2 = new MyPromise((resolve, reject) => {
                if (this.status === MyPromise.FULFILLED) {
                    queueMicrotask(() => {
                        try {
                            const x = realOnFulFilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    return;
                }
                if (this.status === MyPromise.REJECTED) {
                    queueMicrotask(() => {
                        try {
                            const x = realOnRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    return;
                }
                if (this.status === MyPromise.PENDING) {
                    this.onFulfilledCallbacks.push(() => {
                        try {
                            const x = realOnFulFilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    this.onRejectedCallbacks.push(() => {
                        try {
                            const x = realOnRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                }
            });
            return promise2;
        };
        this.catch = (onRejected) => {
            this.then(null, onRejected);
        };
        try {
            executor(this.resolve, this.reject);
        }
        catch (e) {
            this.reject(e);
        }
    }
}
MyPromise.PENDING = 'pending';
MyPromise.FULFILLED = 'fulfilled';
MyPromise.REJECTED = 'rejected';
function resolvePromise(promise2, x, resolve, reject) {
    console.log(x, promise2);
    if (x === promise2) {
        // 如果返回的值是当前promise2则报错
        return reject(new TypeError('Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>'));
    }
    if (x instanceof MyPromise) {
        if (x.status === MyPromise.PENDING) {
            x.then((y) => {
                resolvePromise(promise2, y, resolve, reject);
            }, reject);
        }
        else if (x.status === MyPromise.FULFILLED) {
            resolve(x.value);
        }
        else if (x.status === MyPromise.REJECTED) {
            reject(x.reason);
        }
        return;
    }
    // 非对象或函数
    if (x === null || (typeof x !== 'function' && typeof x !== 'object')) {
        resolve(x);
        return;
    }
    // 对象或函数去找到then函数
    let then;
    try {
        then = x.then;
    }
    catch (e) {
        return reject(e);
    }
    // then不是函数, 则认为是普通的函数或对象, 直接resolve
    if (typeof then !== 'function') {
        return resolve(x);
    }
    let called = false;
    try {
        then.call(x, (val) => {
            if (called) {
                return;
            }
            called = true;
            resolvePromise(promise2, val, resolve, reject);
        }, (reason) => {
            if (called) {
                return;
            }
            called = true;
            reject(reason);
            // resolvePromise(promise2, reason, resolve, reject)
        });
    }
    catch (e) {
        if (called) {
            return;
        }
        called = true;
        reject(e);
    }
}

MyPromise.deferred = function () {
    let result = {}
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}

module.exports = MyPromise;
