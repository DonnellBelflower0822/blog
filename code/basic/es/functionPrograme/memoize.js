const memoize = (fn) => {
    const cache = {}

    function realFunction(...args) {
        const query = JSON.stringify(args)

        if (!Object.prototype.hasOwnProperty.call(cache, query)) {
            console.log('calc')
            cache[query] = fn.apply(this, args)
        } else {
            console.log('cache')
        }

        return cache[query]
    }
    return realFunction
}

const calc = memoize((a, b) => a + b)

calc(1, 2)
calc(2, 2)
calc(1, 2)

