console.log(Symbol('foo')) // Symbol(foo)
console.log(Symbol('foo').toString()) // Symbol(foo)

// 类型
console.log(typeof Symbol('foo'))  // symbol

// 判断: 都是独一无二的值
console.log(Symbol('foo') === Symbol('foo'))  // false

// 获取symbol的描述
console.log(Symbol('hello symbol').description) // hello symbo

// 不能参与计算
// console.log(s1 + 'hello')   // TypeError: Cannot convert a Symbol value to a string

