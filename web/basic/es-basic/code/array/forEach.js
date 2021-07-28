const arr = ['a', 'b', 'c']
// [ 0, 1, 2 ]
console.log([...arr.keys()])
// [ 'a', 'b', 'c' ]
console.log([...arr.values()])
// [ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ] ]
console.log([...arr.entries()])

for (let i = 0;i < arr.length;i + 1) {
}
for (const item in arr) {
  // [ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ] ]
  console.log(item)
}