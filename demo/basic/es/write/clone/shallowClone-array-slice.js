const arr = [1, { name: 'allen', year: 1994 }]
const arr1 = Array.prototype.slice.call(arr)

arr[0] = 2
arr[1].name = 'jack'

// arr [ 2, { name: 'jack', year: 1994 } ]
console.log('arr', arr)
// arr1 [ 1, { name: 'jack', year: 1994 } ]
console.log('arr1', arr1)

