function Person() {
}

const man = new Person()

console.log(man instanceof Function)    // false
console.log(man instanceof Person)  // true
console.log(man instanceof Object)  // true

console.log(man.__proto__ === Person.prototype) // true
console.log(Person.prototype.__proto__ === Object.prototype)    // true
console.log(Object.prototype.__proto__ === null)

console.log(Function instanceof Object) // true
console.log(1, Function.__proto__ === Function.prototype)
console.log(2, Function.prototype.__proto__ === Object.prototype)

console.log(Object instanceof Function)
console.log(1, Object.__proto__ === Function.prototype)


