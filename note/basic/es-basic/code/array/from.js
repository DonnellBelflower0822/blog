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
