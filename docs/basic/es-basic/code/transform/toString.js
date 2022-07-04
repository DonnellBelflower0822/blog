console.log(String()) // ''

console.log(String(true)) // 'true'
console.log(String(false))  // 'false'

console.log(String(0))  // '0'
console.log(String(-0)) // '0'
console.log(String(NaN))  // 'NaN'

console.log(String(null)) // 'null'

console.log(String(undefined))  // 'undefined'

console.log(String({})) // [object Object]
console.log(String({ a: 1 })) // [object Object]
console.log(String({ a: 1, toString() { return 'hello' } })) // hello

console.log(String([])) // ''
console.log(String([1])) // '1'
console.log(String([1, 2])) // '1,2'
