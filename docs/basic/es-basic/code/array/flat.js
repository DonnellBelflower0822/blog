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
