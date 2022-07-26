function Foo() { }

const foo = new Foo()

console.log(Foo.prototype.__proto__ === Object.prototype)  // true
console.log(Foo.prototype.__proto__.constructor === Object)  // true

console.log(Function.prototype.__proto__ === Object.prototype)  // true
console.log(Function.prototype.__proto__.constructor === Object)  // true