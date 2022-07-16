function foo() {
    console.log(this.a)
}

var obj = {
    foo,
    a: 'object'
}

// { foo: [Function: foo], a: 2 }
obj.foo()
// 最后一个点前面的对象
window.obj.foo()

var a = 'global'

// 隐式绑定丢失
var b = obj.foo
// global
// 等价于 window.b()
b()