const arr = [1, '1', 22, 1, NaN, NaN]
console.log(new Set(arr)) // Set(4) { 1, '1', 22, NaN }

console.log([...new Set(arr)])  // [ 1, '1', 22, NaN ]

console.log([...new Set('ababbc')].join(''))    // abc