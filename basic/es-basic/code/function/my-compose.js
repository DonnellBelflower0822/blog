function flowRight(...fns) {
  return (value) => {
    // 倒序
    // 拿到上一个的结果作为当前函数的参数进行执行
    return fns.reverse().reduce((prevValue, fn) => {
      return fn(prevValue)
    }, value)
  }
}

const toUpper = s => s.toUpperCase()
const reverse = arr => arr.reverse()
const first = arr => arr[0]
const f = flowRight1(toUpper, first, reverse)
console.log(f(['one', 'two', 'three'])) // "THREE"