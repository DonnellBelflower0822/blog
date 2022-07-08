const sum = (a, b, c, d) => {
    return a + b + c + d
}

const curry = (fn) => {
    return function f(...args) {
        if (args.length === fn.length) {
            return fn.apply(this, args)
        }

        return (...restArgs) => {
            return f(...args, ...restArgs)
        }
    }
}

const fn = curry(sum)

console.log(fn(1)(2)(3)(4))

console.log(fn(1, 2, 3, 4))
