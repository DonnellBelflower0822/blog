# Array

## map,filter,reduce
```js
const arr = [1, 2, 3]
// [ 2, 4, 6 ]
console.log(arr.map(item => item * 2))
// [ 3 ] 返回true才保留, false会被过滤
console.log(arr.filter(item => item > 2))
// 6
console.log(arr.reduce((res, item) => res + item))
```

## 扩展运算符

```js
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
```

## Array.from

```js
const arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  'length': 3,
}

console.log(Array.from(arrayLike))

console.log([].slice.call(arrayLike))

// 数组的扩展运算符只能处理有iterable
// console.log([...arrayLike])

// [1,2,3]
const set = new Set([1, 2, 3])
console.log(Array.from(set))

// [ undefined, undefined, undefined ]
console.log(Array.from({ length: 3 }));
```

## Array.of

```js
console.log(Array.of(2, 3, 4)) // [ 2, 3, 4 ]
console.log(Array.of(2))  // [2]
console.log(Array.of())  // []

console.log(Array())  // []
console.log(Array(3)) // [,,]
console.log(Array(3, 4, 5)) // [3,4,5]
```

## find/findIndex

```js
const arr = [
  { id: 1, name: 'allen' },
  { id: 2, name: 'tom' },
  { id: 3, name: 'jack' },
  { id: 2, name: 'tim' },
]

const res = arr.find(item => item.id === 2)
console.log(res)  // { id: 2, name: 'tom' }

const index = arr.findIndex(item => item.id === 2)
console.log(index)  // 1
```

## fill
```js
console.log(
  // [ 'hello', 'hello', 'hello' ]
  new Array(3).fill('hello')
)
```

## keys/values/entries
> 返回的是遍历器对象

```js
const arr = ['a', 'b', 'c']
// [ 0, 1, 2 ]
console.log([...arr.keys()])
// [ 'a', 'b', 'c' ]
console.log([...arr.values()])
// [ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ] ]
console.log([...arr.entries()])
```

## includes

```js
const arr = [1, 2, 3]
// true
console.log(arr.includes(3))
```

## flat

```js
// [ 1, 2, 3, 4 ]
console.log([1, 2, [3, 4]].flat())

// [ 1, 2, 3, [ 4, 5 ] ] 默认只能拉平一层
console.log([1, 2, [3, [4, 5]]].flat())
// 指定拉平几层
// [ 1, 2, 3, 4, 5 ]
console.log([1, 2, [3, [4, 5]]].flat(2))
// [ 1, 2, 3 ]
console.log([1, [2, [3]]].flat(Infinity))
// [ 1, 2, 4, 5 ] 空位被过滤
console.log([1, 2, , 4, 5].flat())
```