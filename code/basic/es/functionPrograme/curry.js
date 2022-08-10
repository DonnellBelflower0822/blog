const sum = (a, b, c, d) => {
    return a + b + c + d
}

function curry(fn) {
    return function f(...args) {
        if (fn.length === args.length) {
            return fn(...args)
        }

        return (...resetArgs) => {
            return f(...args, ...resetArgs)
        }
    }
}

const fn = curry(sum)

console.log(fn(1)(2)(3)(4))

console.log(fn(1, 2, 3, 4))
