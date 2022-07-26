const co = require('./co')
function wait(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data === 'error') {
                reject(data)
            }
            resolve(data)
        }, 1000)
    })
}

function thunk() {
    return function (callback) {
        setTimeout(() => {
            callback(null, 'thunk')
        }, 1000)
    }
}

function* gen() {
    const a = yield wait('hello')
    const b = yield thunk()
    console.log(a, b)
}

co(gen)