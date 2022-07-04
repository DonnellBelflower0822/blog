function getSum(a, b, c) {
  return a + b + c
}

function curry(fn) {
  return function f(...args) {
    if (fn.length === args.length) {
      return fn.apply(this, args)
    }

    return function (...extArgs) {
      return f(...args, ...extArgs)
    }
  }
}

const getSumCurry = curry(getSum)

console.log(getSumCurry(1)(2)(3))
console.log(getSumCurry(1, 2)(3))
console.log(getSumCurry(1, 2, 3))

