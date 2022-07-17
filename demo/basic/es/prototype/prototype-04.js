console.log(Object.prototype.__proto__) // null

console.log(Object.__proto__ === Function.prototype)    // true

console.log(Function.prototype === Function.__proto__)  // true

console.log(Function.prototype.__proto__ === Object.prototype)  // true