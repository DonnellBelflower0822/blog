// 1. 浅克隆
const arr1 = [1, 2, 3]

const arr2 = [...arr1]
const [...arr3] = arr1

const arr4 = arr1.concat()

// 合并数组
const arr5 = [1, 2]
const arr6 = [3, 4]
const arr7 = [...arr5, ...arr6]
const arr8 = arr5.concat(arr6)

// 解构
const [item, ...arr9] = [1, 2, 3, 4]

// 字符串变成数组
// ['h', 'e', 'l', 'l', 'o']
console.log([...'hello'])

// 将Iterator接口对象转成数组
function fn() {
  // [Arguments] { '0': 1, '1': 2, '2': 3 }
  console.log(arguments)
  // [ 1, 2, 3 ]
  console.log([...arguments])
}
fn(1, 2, 3)

const set = new Set([1, 2, 3])
console.log(
  // Set { 1, 2, 3 }
  set,
  // [ 1, 2, 3 ]
  [...set]
)

const map = new Map([
  ['a', 'b'],
  ['c', 'd'],
])
console.log(
  // [Map Iterator] { 'a', 'c' }
  map.keys(),
  // [ 'a', 'c' ]
  [...map.keys()],
)

function* go() {
  yield 1
  yield 2
  yield 3
}
// [ 1, 2, 3 ]
console.log([...go()])