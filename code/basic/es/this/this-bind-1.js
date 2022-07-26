var a = 'hello this'

function foo0() {
    'use strict'
    // 使用严格模式, this会绑定为undefind
    console.log(this.a)
}

// TypeError: Cannot read property 'a' of undefined
// foo0()

function foo1() {
    console.log(this.a)
}
// hello this
foo1();

(() => {
    'use strict'
    // 默认模式不影响函数调用的默认绑定
    // hello this
    foo1()
})()


