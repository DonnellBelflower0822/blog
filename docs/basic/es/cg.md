# 内存管理

- https://muyiy.cn/blog/1/1.4.html#%E5%86%85%E5%AD%98%E5%9B%9E%E6%94%B6
- https://muyiy.cn/blog/3/3.1.html#%E4%B8%8A%E6%9C%9F%E6%80%9D%E8%80%83%E9%A2%98%E8%A7%A3

## 任务
- 垃圾回收机制
- 内存泄露

## 概念

> 垃圾回收是一种自动的内存管理机制。当计算机上的动态内存不再需要时，就应该予以释放，以让出内存

## 原理
- 考虑某个变量或对象在未来的程序运行中将不会被访问
- 向这些对象要求归还内存

## 垃圾回收机制

### 引用标记

```js
let obj1 = { a: 2 }     // 内存中 对象A {a:2}   // 对象 A 引用 1
let obj2 = obj1         //  对象 A 引用 2

obj1 = 0                // 对象 A 引用 1
obj2 = 0                // 对象 A 引用 0 (对象A就可以内存回收)
```

**循环引用无法被内存回收**
```js
function foo() {
    var obj1 = {}
    var obj2 = {}
    obj1.a = obj2   // 对象Obj1 引用 对象Obj2
    obj2.a = obj1   // 对象Obj2 引用 对象Obj1
}
```

> 当foo函数执行完了, 对象obj1和对象obj2的引用次数都不是0, 无法被内存回收

可以给对象赋值为null, 指定内存回收

```js
function foo() {
    // ....

    // 给对象赋值为null, 
    obj1 = null
    obj2 = null
}
```

