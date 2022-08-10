function upperCase(str) {
    debugger
    return str.toUpperCase()
}

function first(arr) {
    debugger
    return arr[0]
}

function reverse(arr) {
    debugger
    return arr.reverse()
}

const array = ['hello', 'world', 'allen']

console.log(111, upperCase(first(reverse(array))))



const compose = (...fns) => (
    fns.reduce((prevFn, currentFn) => (
        (...args) => prevFn(currentFn(...args))
    ))
)

const fn = compose(upperCase, first, reverse)
console.log(222, fn(array))

const simpleCompose = (...fns) => {
    return fns.reduce((prevFn, currentFn) => (
        (...args) => prevFn(currentFn(...args))
    ))
}

const fn1 = simpleCompose(upperCase, first, reverse)
console.log(333, fn1(array))

