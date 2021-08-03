# js

## 原型/原型链

函数.__proto__ === Function.prototype

```js
构造函数 Person
原型对象  Person.prototype
实例  person

构造函数.prototype === 原型对象
实例.__proto__ === 原型对象
原型对象.constructor === 构造函数

原型对象(也是实例).__proto__ === Object.prototype
Object.prototype.__proto__ === null

构造函数Person/Object.__proto__ === Function.prototype

Function.prototype(实例).__proto__ === Object.prototype
```

## 继承

```js
// 原型链上继承: 父类的成员属性是引用地址的会互相影响
function Sub(){}
Sub.prototype = new Parent()


// 构造函数增强: 丢失Parent.prototype
function Sub(){
  Parent.call(this)
}

//组合: Parent被实例两次, Parent的实例属性会有两份
function Sub(){
  Parent.call(this)
}
Sub.prototype = new Parent()

// 寄生组合式继承
function Sub(){
  Parent.call(this)
}
Sub.prototype = Object.create(Parent.prototype)
Sub.prototype.constructor = Sub

class Sub extends Parent {}
```

## eventloop

- 同步任务是进入主线程排队执行, 前一任务执行完后才执行下一任务
- 异步任务是进入任务队列,等主线程任务执行完毕,任务队列去请求主进程执行任务,该任务才会进入主进程

- 任务分类
  - 微任务: 
    - process.nextTick
    - Promise.resolve/reject().then/catch()
    - MutationObserver
  - 宏任务:
    - setTimeout
    - setInterval
    - setImmediate
    - script代码

- 同步任务执行完成
- 查看微任务队列清空
  - 如果微任务队列执行中产生微任务添加到微任务队列尾部
- 拿出第一个宏任务执行
- 重复“查看微任务队列清空” 


## [ ] Promise/async,await


## Promise怎么实现链式

- then/catch返回新的promise
- 通过执行then和catch函数后的返回值
  - 通过catch捕获then和catch抛出错误, 调用新promise的reject
  - 1. 简单类型或undefined: 调用新promise的resolve
  - 2. 还是promise调用then, 将针对不同情况调用新promise的resolve/reject

## 柯里化
> 把接收多个参数的原函数变换成接受一个单一参数（原来函数的第一个参数的函数)并返回一个新的函数，新的函数能够接受余下的参数，并返回和原函数相同的结果

- 对参数缓存
- 函数粒度更小
- 例如vue3的reactive/shallowReactive/readonly

## 深浅克隆

- 浅克隆
  - Object.create
  - {...}
  - 模拟
    - 对象且不是null
      - for in去复制
    - 否值直接复制
- 深克隆
  - JSON.parse(JSON.stringify())
  - 模拟
    - 不是对象或是null直接复制
    - 根据constructor去创建Date/RexRep
    - 判断是否已经克隆过,通过WeakMap.has(target)
      - 已经克隆过: 返回weakMap.get(target)
      - 没有克隆过:
        - 通过constructor创建新数据
        - 将新数据保存到weakMap
        - for in
          - 递归value

## 模块化

- Commonjs
  - module.exports = {}
  - require
  - 模块输出是一个值的拷贝
  - 运行是加载
  - 可以在if
- ESModule
  - export
  - export default 
  - import
  - 输出是值的引用
  - 编译时调用
  - 比如放在文件开头
  - 不可嵌套if
  - 静态分析(tree shaking)

## 异步加载js

```js
(()=>{
  const script = document.createElement('script')
  script.src = ''
  script.async = true
  document.head.appendChild(script)
})
```

## async/defer

```
html解析 
遇到script后html会停止解析,下载script,执行script文件, 
html继续解析
<script src=''></script>

html解析
遇到script,下载script, 不会停止html解析
当script下载完成,停止hmtl解析, 执行script
html继续解析
<script src='' async></script>

html解析
遇到script,下载script, 不会停止html解析
html继续解析完成
执行script
<script src='' defer></script>
```

## Set/Map/WeakSet/WeakMap

- Set储存任意类型的数据,值是唯一
- Map保存健值对
- Weak
  - WeakMap的key只接收对象/函数(除了null)
  - WeakSet只能存储对象/函数(除了null)
  - 弱引用, 对象被回收时,会被垃圾回收
  - 弱引用的对象不计计数引用
  - 不能被遍历

## call/apply/bind

- 改变函数的this指向
- 执行
  - call/apply立即执行
  - bind返回新函数
- 参数
  - call和bind(this, ...args)
  - apply(this,args)

## 词法作用域/静态作用域

执行上下文
- 变量对象

## new
```
function _new(constcutor,...args){
  const obj = {}
  obj.__proto__ = constcutor.prototype
  const res = constcutor.apply(obj,...args)

  return (
    (res!==null &&  typeof res === 'object')
    || typeof === 'function' 
  ) ? res : obj
}
```

## 不使用箭头函数

- 构造函数
- 函数声明提升
- 非匿名函数
- 函数中使用this/arguments
- 对象中的函数向为对象添加属性或方法

## 判断数组

- Array.isArray
- [].constructor === Array
- [] instanceof Array
- Object.prototype.toString.call([])  // [object Array]

## ts
- 编写脚本时就检测错误
- 携作
- 提高项目的稳定性, 重构时也更安全

## [ ] interface/type





