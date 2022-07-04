console.log(Number()) // 0

console.log(Number(true)) // 1
console.log(Number(false))  // 0

console.log(Number(0))  // 0
console.log(Number(-0)) // -0
console.log(Number(NaN))  // NaN

console.log(Number(null)) // 0

console.log(Number(undefined))  // NaN

console.log(Number('')) // 0
console.log(Number(' '))  // 0
console.log(Number('-1')) // -1
console.log(Number('2'))  // 2
console.log(Number('2xx'))  // NaN
console.log(Number('xx2'))  // NaN
console.log(Number('2 2'))  // NaN

console.log(Number({})) // NaN
console.log(Number({ a: 1 })) // NaN

console.log(Number([])) // 0
console.log(Number([1])) // 1
console.log(Number(['1'])) // 1
console.log(Number(['1a'])) // NaN
console.log(Number([1, 2])) // NaN
