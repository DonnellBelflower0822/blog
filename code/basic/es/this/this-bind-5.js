function Foo() {
    // <-- 找到此处的作用域
    this.sayArrow = () => {
        // 往父级作用域找最近一个非箭头函数或全局作用域来决定this指向
        console.log(this)
    }
}

const f = new Foo()

console.log(f)

// <-- 找到这里的作用域
const obj = {
    a: 'object',
    c: () => {
        console.log(this.a)
    }
}

obj.c()
const { c } = obj
c()