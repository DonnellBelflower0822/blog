// 组合函数
function compose(f, g) {
  return function (x) {
    return f(g(x))
  }
}
function first(arr) {
  return arr[0]
}
function reverse(arr) {
  return arr.reverse()
}
// 函数数组是从右到左运行
let last = compose(first, reverse)
console.log(last([1, 2, 3, 4]))