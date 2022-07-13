console.log(Object.prototype.toString.call(undefined)) // [object Undefined]

console.log(Object.prototype.toString.call(true)) // [object Undefined]
console.log(Object.prototype.toString.call(1)) // [object Number]
console.log(Object.prototype.toString.call('string')) // [object String]

console.log(Object.prototype.toString.call(null)) // [object Null]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call(/\d/)) // [object RegExp]
console.log(Object.prototype.toString.call([])) // [object Array]

console.log(Object.prototype.toString.call(console.log)) // [object Function]
console.log(Object.prototype.toString.call(Symbol())) // [object Symbol]

console.log(Object.prototype.toString.call(new Map())) // [object Map]
console.log(Object.prototype.toString.call(new WeakMap())) // [object WeakMap]
console.log(Object.prototype.toString.call(new Set())) // [object Set]


function Person() { }
Person.prototype.constructor = Person
const p = new Person()

console.log(Object.prototype.toString.call(p))  // [object Object]