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
module.exports = {
    toPromise, isPromise
}
