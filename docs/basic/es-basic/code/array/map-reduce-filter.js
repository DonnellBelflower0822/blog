const arr = [1, 2, 3]
// [ 2, 4, 6 ]
console.log(arr.map(item => item * 2))
// [ 3 ] 返回true才保留, false会被过滤
console.log(arr.filter(item => item > 2))
// 6
console.log(arr.reduce((res, item) => res + item))