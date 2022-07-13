const s = Symbol()

console.log(typeof s) // symbol

// 不能使用new命令. 生成的 Symbol 是一个原始类型的值，不是对象.
// TypeError: Symbol is not a constructor
// new Symbol()

// Symbol()
console.log(s.toString())

// false
console.log(Symbol('a') === Symbol('a'))

// Symbol.for()
// true
console.log(Symbol.for("bar") === Symbol.for("bar"))

// Symbol.keyFor()
const s1 = Symbol.for('allen')
// allen
console.log(Symbol.keyFor(s1))

// Symbol.keyFor()
const s2 = Symbol('allen')
// undefined
console.log(Symbol.keyFor(s2))

