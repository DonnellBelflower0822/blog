let obj1 = { a: 2 }     // 内存中 对象Obj1 {a:2}   // 对象 Obj1 引用 1
let obj2 = obj1         //  对象 Obj1 引用 2

obj1 = 0                // 对象 Obj1 引用 1
obj2 = 0                // 对象 Obj1 引用 0 (对象Obj1就可以被内存回收)


function foo() {
    var obj1 = {}
    var obj2 = {}
    obj1.a = obj2   // 对象Obj1 引用 对象Obj2
    obj2.a = obj1   // 对象Obj2 引用 对象Obj1
}

// 当foo函数执行完了, 对象obj1和对象obj2的引用次数都不是0, 无法被内存回收

function foo() {
    var obj1 = {}
    var obj2 = {}
    obj1.a = obj2   // 对象Obj1 引用 对象Obj2
    obj2.a = obj1   // 对象Obj2 引用 对象Obj1

    // 给对象赋值为null, 
    obj1 = null
    obj2 = null
}
