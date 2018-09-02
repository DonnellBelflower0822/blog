# 面向对象

## 执行环境
> 执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。

### 执行环境的列表
- 全局作用域
- 局部作用域(函数)

### 作用域链
> 标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始， 然后逐级地向后回溯，直至找到标识符为止

## 手动清除内存
```javascript
var a=20
a=null
```

## object
> 一组数据和功能的集合
```
var obj = new Object({
    name: 'allen'
})
Object.prototype.age = 20
// 构造函数
console.log(obj.constructor)  // Object
// 用于检查给定的属性在当前对象实例中(而不是在实例的原型中)是否存在
console.log(obj.hasOwnProperty('name'))
console.log(obj.hasOwnProperty('age'))
console.log(obj.toString())
console.log(obj.valueOf())
```

### 创建对象
#### 字面量
```javascript
var person = new Object()
person.name='allen'
var ming = {name:'tom'}
```
#### 工厂模式
```javascript
function factroy (name) {
    var o = new Object()
    o.name = name
    return o
}
var person1 = factroy('allen')
var person2 = factroy('tom')
```
#### 构造函数
- 任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数

```javascript
function Person (name) {
    this.name = name
}

var person1 = new Person('allen')
var person2 = new Person('tom')
```
#### 原型模式
- 每个函数都有一个 prototype(原型)属性
- 让所有对象实例共享它所包含的属性和方法

```javascript
function Person (name) {
    this.name = name
    this.hobby = [1, 2]
}

Person.prototype.say = function () {
console.log(this.hobby)
}
let yao = new Person('yao')
let ming = new Person('ming')
yao.hobby.push(3)
ming.say()  // [1,2]
```

## new原理
### 步骤
- 创建一个新对象
- 将这个对象的__proto__ 指向构造函数的实例原型
- 将构造函数的this指向这个新对象
- 执行构造函数中的代码
- 返回新对象

### 模拟new
```
function _new (fn) {
    let args = Array.from(arguments)
    let context = args.shift() || window
    let obj = {}
    obj.__proto__ = fn.prototype
    let res = context.apply(obj, args)
    if (res instanceof Object && res !== null) {
      return res
    } else {
      return obj
    }
}

let fn = function (name) {
    this.name = name
}
fn.prototype.say = function () {
    console.log('我是' + this.name)
}
let person = _new(fn, 'allen')
console.log(person.name)
person.say()
```

## 函数
### arguments
```javascript
function fn (a, b) {
    console.log(arguments)  // Arguments
    // 将类数组转换成数组
    console.log(Array.prototype.slice.call(arguments))  // Array
    console.log(Array.from(arguments))
}
```

### bind,call,apply
> 改变函数的执行上下文


## 继承


## 闭包
- 有权访问另一个 函数作用域中的变量的函数
- 创建闭包的常见方式，就是在一个函数内部创建另一个函数

## this
> 代码执行时才能确定this指向

```javascript
var a = 'one'
function Person (){
    console.log(this.a)
}
var obj = {
    a:'two'
}


```