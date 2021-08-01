const p1 = { name: 'allen' }
const p2 = p1

p2.name = 'tom'
console.log(p1.name)

const arr1 = [1, 3, 2]
const arr2 = arr1.sort()
console.log(arr1) // [ 1, 2, 3 ]
console.log(arr2) // [ 1, 2, 3 ]
