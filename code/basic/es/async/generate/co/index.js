function toPromise(obj) {
    if (!obj) {
        return obj
    }

    if (isPromise(obj)) {
        return obj
    }

    if (typeof obj === 'function') {
        return new Promise((resolve, reject) => {
            obj.call(this, (err, ...args) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(args.length === 1 ? args[0] : args)
                }
            })
        })
    }

    return obj
}

function isPromise(obj) {
    return typeof obj.then === 'function'
}

function co(generate) {
    const _this = this

    return new Promise((resolve, reject) => {
        // 初始化迭代器
        if (typeof generate === 'function') {
            generate = generate.call(_this)
        }

        // 如果不是迭代器就直接resolve
        if (!generate || typeof generate.next !== 'function') {
            return resolve(generate)
        }

        function onFulfilled(res) {
            let ret
            try {
                ret = generate.next(res)
            } catch (e) {
                return reject(e)
            }

            next(ret)
        }

        function onRejected(err) {
            let ret

            try {
                ret = generate.throw(err)
            } catch (e) {
                return reject(ret)
            }
            next(ret)
        }

        onFulfilled()

        function next(result) {
            if (result.done) {
                return resolve(result.value)
            }

            // 转换为promise
            const value = toPromise.call(_this, result.value)
            if (value && isPromise(value)) {
                // 执行promise
                value.then(onFulfilled, onRejected)
            }
        }
    })
}

module.exports = co