const mod = require('./lib')

// 基础类型
console.log('base count', mod.count)    // 3
console.log('base countGet', mod.countGet)  // 3

mod.add()

console.log('base count', mod.count)    // 3
console.log('base countGet', mod.countGet)  // 4

// 引用类型
console.log('adv obj', mod.obj) // {a:1}
mod.addObj()
console.log('adv obj', mod.obj) // {a:2}

