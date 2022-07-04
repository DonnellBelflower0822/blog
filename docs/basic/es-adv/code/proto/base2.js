// 构造函数
function Foo() { }

// prototype指向原型
Foo.prototype.say = function () { }

// 实例
const f1 = new Foo()

console.log(
  // 指向构造函数的原型prototype
  f1.__proto__,
  // 构造函数的原型.__proto__ 指向 Object的原型
  f1.__proto__.__proto__ === Object.prototype,
  // 构造函数的原型.__proto__.constructor 指向Object构造函数
  f1.__proto__.__proto__.constructor === Object,
  // Object.__proto__ === Function.prototype
  f1.__proto__.__proto__.constructor.__proto__ === Function.prototype,
  // 构造函数的原型.__proto__.__proto__
  // => Object.prototype.__proto__ = null
  f1.__proto__.__proto__.__proto__ === null,

  // 构造函数的原型对象 => Function构造函数的原型
  Foo.__proto__ === Function.prototype,

  Foo.__proto__.constructor === Function.prototype,
  // 构造函数.原型对象.原型对象 => Object的原型
  Foo.__proto__.__proto__ === Object.prototype,
)

// undefined
console.log(Function.prototype.bind().prototype)