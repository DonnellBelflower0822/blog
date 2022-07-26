function Foo() { }

console.log(Foo.__proto__ === Function.prototype)   // true
console.log(Foo.__proto__.constructor === Function) // true

console.log(Object.__proto__ === Function.prototype)    // true
console.log(Object.__proto__.constructor === Function)  // true