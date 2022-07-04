// 构造函数
function Foo() { }

// prototype指向原型
Foo.prototype.say = function () { }

// 实例
const f1 = new Foo()

console.log(
  // 实例.__proto__ 指向 构造函数的prototype
  f1.__proto__ === Foo.prototype,
  // 实例.__proto__.constructor 指向 构造函数
  f1.__proto__.constructor === Foo
)
