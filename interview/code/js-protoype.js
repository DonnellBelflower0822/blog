// 构造函数
function Person() { }

// 原型对象
Person.prototype.say = function () { }

// 实例
const man = new Person()

// 实例.__proto__ 指向 原型对象
console.log(man.__proto__ === Person.prototype)

// 原型对象.constructor 指向  构造函数
console.log(Person.prototype.constructor === Person)

// 原型对象(实例).__proto__ 指向 Object.prototype
console.log(Person.prototype.__proto__ === Object.prototype)

console.log(Object.prototype.constructor === Object)

console.log(Object.prototype.__proto__ === null)

console.log(Person.__proto__ === Function.prototype)

// 函数的__proto__ 都指向 Function的原型对象
console.log(Object.__proto__ === Function.prototype)
console.log(Person.__proto__ === Function.prototype)
console.log(Function.__proto__)

