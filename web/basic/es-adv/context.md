# 执行上下文/作用域链

## 基础概念

### 作用域

> 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

### 作用域分类

> js采用静态作用域(语法作用域)

- 静态作用域(词法作用域): 函数的作用域在函数定义的时候就决定
- 动态作用域：函数的作用域是在函数调用的时候才决定的。

**例子**

```js
var value = 1

function foo() {
  // js采用静态作用域，函数定义时就决定了作用域
  console.log(value)
}

function bar() {
  var value = 2
  foo()
}

// 1
bar()
```

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    // 定义时决定作用域： 
    return scope;
  }
  return f();
}
// local scope
console.log(checkscope());
```

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
// local scope
console.log(checkscope()());
```

### 可执行代码

- 全局代码: 全局执行上下文
- 函数代码：函数执行上下文
- eval代码：

### 执行上下文栈

- 是一个`先进后出,后进先出`的栈结构
- 只有整个应用结束才会清空ECStack。否则ECStack永远有全局执行上下文(globalContext)

### 模拟执行上下文栈执行过程

```js
function fun3() {
  console.log('fun3')
}

function fun2() {
  fun3();
}

function fun1() {
  fun2();
}

fun1()
```

```
ECStack = []

// 最开始遇到全局执行上下文
ECStack = [
  globalContext
]

// 遇到fun1函数
// ECStack = [fun1 functionContext,globalContext]
ECStack.unshift(fun1 functionContext)

// 遇到fun2函数
// ECStack = [fun2 functionContext, fun1 functionContext,globalContext] 
ECStack.unshift(fun2 functionContext)

// 遇到fun3函数
// ECStack = [fun3<functionContext>, fun2<functionContext>, fun1<functionContext> ,globalContext]
ECStack.unshift(fun3 functionContext)

// fun3执行结束 回到 fun2
// ECStack = [fun2<functionContext>, fun1<functionContext> ,globalContext]
ECStack.shift()

// fun2执行结束 回到 fun1
// ECStack = [fun1<functionContext>, globalContext]
ECStack.shift()

// fun1执行结束 回到 gobalContext
// ECStack = [globalContext]
ECStack.shift()

// 整个应用结束前, ECStack永远有全局执行上下文
```

### 执行上下文

- 变量对象（VO）
- 作用域链（Scope）
- this

### 变量对象

> 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

#### 分类

- 全局上下文的变量对象 (VO)
- 函数上下文的变量对象（AO）也成称为活动对象
  - 只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活
  - 只有被激活的变量对象，也就是活动对象上的各种属性才能被访问

### 执行阶段
- 进入执行上下文
- 代码执行


### 进入执行上下文
- 变量对象包括
  - 函数所有形参（函数上下文）
  - 函数声明
  - 变量声明

## 作用域链 
> 当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

## 完整执行流程
- 函数声明时用[[scope]]会记录当前的作用域链(重点)
- 初始化执行上下文
  - 变量对象
    - 形参初始化
    - 函数声明
    - 变量声明：与函数名一样不会覆盖
  - 作用域链：
    - 用函数[[scope]]去初始化作用域链
    - 将当前变量对象压入作用域链顶端

```js
var scope = "global scope";
function checkscope(name) {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
checkscope('tom');
```

```
// 全局执行上下文
ECStack = [globalContext]

// 初始化globalContext
globalContext = {
  VO: [
    {
      scope: undefined,
      checkscope: Reference function
    }
  ],
  Scope: [globalContext.VO],
  this: globalContext.VO
}

// 遇到checkscope: funciton checkscope() {...}
checkscope.[[scope]] = [globalContext.VO]

// 执行checkscope： checkscope()
ECStack = [
  checkscopeContext,
  globalContext
]

// 初始化checkscopeContext
checkscopeContext = {
  AO: {
    // 参数初始化
    arguments: {
      0: 'tom'
      length: 0
    },
    name: 'tom',
    // 函数声明
    f: reference to function f(){}
    // 变量声明
    scope: undefined,
  },
  // 作用域组成
  // 1. 赋值函数[[scope]]
  // 2. 将checkscopeContext.AO压入Scope的顶端
  // 等于 [checkscopeContext.AO,globalContext.VO]
  Scope: [
    checkscopeContext.AO, 
    ...checkscope.[[scope]]
  ],
  this: undefined
}

// 遇到function f(){}
f.[[scope]] = [checkscopeContext.AO,globalContext.VO]

// 执行f()
ECStack = [
  fContext,
  checkscopeContext,
  globalContext
]

// 初始化fContext
fContext = {
  AO:{
    arguments: {
      length: 0
    },
  },
  // [ fContext.AO, checkscopeContext.AO, globalContext.VO ]
  Scope: [fContext.AO,...f.[[scope]] ],
  this: undefined
}

// console.log(scope) 就会从fContext.Scope从左往右去找是否存在

// f执行完毕
ECStack = [
  checkscopeContext,
  globalContext
]

// checkscope执行完毕
ECStack = [
  globalContext
]
```

## 闭包

### 定义

> 闭包是指那些能够访问自由变量的函数。

**自由变量**

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

> 使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露

> 可以在另外一个作用域中调用一个函数的内部函数并访问到该函数作用域中的成员

```js
function makePower(power) {
  return function (number) {
    return Math.pow(number, power)
  }
}

const power2 = makePower(2)
console.log(power2(4))
```

#### 用处

- 可以读取函数内部的变量，
- 让这些变量始终保持在内存中
- 是封装对象的私有属性和私有方法
- 避免全局变量污染

#### 缺点
- 会造成内存泄漏

#### 常见的内存泄漏
- 意外的全局变量
- 被遗忘的计时器
- 闭包

### 闭包执行过程

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}

var foo = checkscope();
foo();
```

1. 执行全局代码，创建全局执行上下文，压入执行上下文栈

```
ECStack = [
  globalContext
]
```

2. 全局执行上下文初始化

```
globalContext = {
  AO:{
    // window
    ...[global],
    // 函数声明
    checkscope: reference to function checkscope(){}
    // 变量声明
    scope: undefined
  },
  Scope: [globalContext.VO],
  this: globalContext.AO
}
```

3. 遇到checkscope函数，保存当前的作用域

```
// [globalContext.VO]
checkscope.[[scope]] = globalContext.Scope
```

4. 执行checkscope函数，创建checkscope函数上下文,压入执行上下文栈

```
ECStack = [
  checkscopeContext,
  globalContext
]
```

5. checkscope函数上下文初始化

```
checkscopeContext = {
  AO: {
    // 形参
    arguments:{
      0: 'allen',
      length: 0
    },
    name: 'allen',
    // 函数声明
    f: reference to function f(){}
    // 变量声明
    scope: undefined
  },
  // 第一步: 用checkscope的[[scope]]属性初始化作用域链
  // 第二部：将checkscope.AO压入Scope的顶端
  // [checkscopeContext.Ao,globalContext.VO]
  Scope: [checkscopeContext.Ao, ...checkscope.[[scope]]],
  this: undefined
}
```

6. 函数f声明，保存作用域链到函数内部属性[[scope]]
  
> 这句超级无敌重要

```
// [checkscopeContext.Ao, globalContext.VO]
f.[[scope]] = checkscopeContext.Scope
```

7. checkscope函数执行完时checkscopeContext

```
checkscopeContext = {
  AO: {
    arguments:{
      0: 'allen',
      length: 0
    },
    name: 'allen',
    f: reference to function f(){}
    scope: 'local scope'
  },
  // [checkscopeContext.Ao,globalContext.VO]
  Scope: [checkscopeContext.Ao, ...checkscope.[[scope]]],
  this: undefined
}
```

8. 执行完毕后，从执行上下文栈中弹出

```
ECStack = [
  globalContext
]
```

9. 执行foo函数，创建foo函数执行上下文，压入执行上下文栈

```
ECStack = [
  fooContext,
  globalContext
]
```

9. foo函数执行上下文初始化,创建变量对象，作用域链，this

```
fooContext = {
  AO: {
    // 形参
    arguments:{
      length:0
    },
    // 函数声明
    // 变量声明
  },
  // 第一步： 用f函数的[[scope]] 来初始化作用域链
  // 第二部：将当前fooContext.AO添加到作用域顶端
  // [fooContext.AO, checkscopeContext.Ao,globalContext.VO]
  Scope: [fooContext.AO, ...f.[[scoped]]],
  this: undefined
}
```

10. 此时f(){return scope}就会从foo的作用域链上去找

```
// 在checkscopeContext.Ao就找到scope为local scope
[fooContext.AO, checkscopeContext.Ao,globalContext.VO]
```


11. f函数执行完毕,从执行上下文栈弹出

```
ECStack = [
  globalContext
]
```

### 例子

**例子0**

```js
var data = [];

for (var i = 0;i < 3;i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```

**执行流程**

> data[0]Context.AO中没有i变量，往上找就找到了globalContext.VO

```
data[0].Scope = [
  data0Context.AO,
  globalContext.VO
]

data0Context.AO = {
  arguments:{
    length:0
  },
}

globalContext.VO = {
  i:3,
  // ...其他
}
```


**例子1**

```js
var data = [];

for (var i = 0;i < 3;i++) {
  data[i] = (function (i) {
    return function () {
      console.log(i);
    }
  })(i);
}

data[0]();
data[1]();
data[2]();
```

**执行流程**

```
// data[0]作用域链

data[0].Scope = [
  data0Context.AO,
  data[0]匿名函数Context.AO,
  globalContext.VO
]

data0Context.AO = {
  arguments:{
    length: 0
  },
}

data[0]匿名函数Context.AO = {
  arguments:{
    length: 1
  },
  i: 0
}

globalContext.VO = {
  // ...其他
  i: 3
}
```


## 完整的执行上下文

```js
// 代码块
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
checkscope();
```

### 执行过程

1. 执行全局代码。创建全局执行上下文，并把全局上下文压入执行上下文栈

```js
ECStack = [
  globalContext
]
```

2. 全局上下文初始化
  
```js
globalContext = {
  // 变量对象
  VO: [global],
  // 作用域链
  Scope: [globalContext.VO],
  // this
  this: globalContext.VO
}
```

3. checkscope创建，保存作用域链到函数内部属性[[scope]]

```js
checkscope.[[scope]] = [
  globalContext.VO
]
```

4. 执行checkscope函数，创建checkscope函数执行上下文，将checkscope函数执行上下文压入执行栈
  
```js
ECStack = [
  checkscopeContext,
  globalContext
]
```

5. checkscope函数执行上下文初始化

```
checkscopeContext = {
  // 1. 复制函数[[scope]]创建作用域
  Scope: [globalContext.VO],
  // 2. 创建活动对象AO
  AO: {
    // 3. 创建arguments
    arguments: {
      length: 0
    },
    // 4. 初始化形参
    // 5. 函数声明
    f: function(){}
    // 6. 变量声明
    scope: undefined
  }
}

// 7. 将活动对象压入checkscope作用域链顶端
checkscopeContext.Scope.unshift(checkscopeContext.AO)
```

6. f函数创建，保存作用域链到f函数内部属性[[scope]]

```
f.[[scope]] = checkscopeContext.Scope
```

7. 执行f函数，创建f函数执行上下文，将f函数执行上下文压入执行上下文
   
```
ECStack = [
  fContext,
  checkscopeContext,
  globalContext
]
```

8. f函数执行上下文初始化

```
fContext = {
  // 1. 复制f函数[[scope]]创建作用域
  Scope: [checkscopeContext.VO,globalContext.VO],
  // 2. 创建活动对象AO
  AO: {
    // 3. 创建arguments
    arguments: {
      length: 0
    },
    // 4. 初始化形参
    // 5. 函数声明
    // 6. 变量声明
  }
}

// 7. 将活动对象压入f作用域链顶端
// fContext.Scope = [fContext.AO,checkscopeContext.VO,globalContext.VO]
fContext.Scope.unshift(fContext.AO)   
```

9. 执行f函数

> 沿着fContext.Scope找scope

10. f函数执行完毕，弹出

```
ECStack = [
  checkscopeContext,
  globalContext
]
```

11. checkscope函数执行完毕，弹出

```
ECStack = [
  globalContext
]
```

## this

> 函数的运行环境，谁调用函数，this执行谁

```js
function foo() {
  console.log(this.a)
}
var a = 1 // 等价于 window.a = 1
foo() // 1  this=window

const obj = {
  a: 2,
  foo: foo
}
obj.foo() // 2  this=obj

const c = new foo() // undefined  this=c
```

### this的优先级

1. 箭头函数：定义箭头函数就锁死
2. call,apply,bind: 强制改this指向
3. new
4. obj.foo()
5. foo()

<img src="./img/this.png" />

### 找

```js
function Foo() {
  this.say = function () {
    console.log(this)
  }
}

const f = new Foo()

const { say } = f

f.say() // Foo{say:f}
f.say.call({ a: 1 })  // {a:1}
say.call({ a: 1 })  // {a:1}
say() // window
```

### 箭头函数的this一旦绑定，不能被任何方式所改变
```js
function Foo() {
  this.sayArrow = () => {
    console.log(this)
  }
}

const f = new Foo()

const { sayArrow } = f

sayArrow()  // Foo{sayArrow:f}
f.sayArrow.call({ a: 1 })  // Foo{sayArrow:f}
sayArrow.call({ a: 1 })  // Foo{sayArrow:f}
```

### 箭头函数的this

> 向上找第一个包裹箭头函数的普通函数

```js
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())  // window
```

## call/apply/bind

> 作用都是改变函数调用时this，都只能作用域函数

| xx     | call     | apply    | bind             |
| ------ | -------- | -------- | ---------------- |
| 参数   | 多个     | 数组     | 多个             |
| 返回值 | 直接执行 | 直接执行 | 返回带执行的函数 |

### call,apply基础使用

```js
const obj = { name: 'allen' };

function say(param1, param2, ...args) {
  console.log(this.name, param1, param2, args);
}

// 改变this的指向
// call和apply的区别，除了上下文后面的参数传递方式不同
say.call(obj, 'man', 27);   // allen man 27 []
say.apply(obj, ['man', 27]);  // allen man 27 []
```

### 箭头函数无法改变其this

> 箭头函数在定义时就绑定好this

```js
const fn = () => {
  console.log(this)
}

fn.call({ name: 'allen' })  // window
fn.apply({ name: 'allen' }) // window
fn.bind({ name: 'allen' })()  // window
```

### bind的基础使用

```js
const obj = { name: 'allen' };
function say(...args) {
  console.log(this, args);
}

// bind返回的是函数
const fn = say.bind(obj, 'man', 27);

fn(1); // { name: 'allen' } [ 'man', 27, 1 ]
fn(2);  // { name: 'allen' } [ 'man', 27, 2 ]
```

### bind后再次调用call，apply,bind都无法改变this

```js
const obj = { name: 'allen' };
function say(...args) {
  console.log(this, args);
}

// bind返回的是函数
const fn = say.bind(obj, 'man', 27);

// { name: 'allen' } [ 'man', 27, 1, 2 ]
fn.call({ b: 'new', name: 'jack' }, 1, 2)
// { name: 'allen' } [ 'man', 27, 1, 2 ]
fn.apply({ b: 'new', name: 'jack' }, [1, 2])
// { name: 'allen' } [ 'man', 27, 1, 2 ]
fn.bind({ b: 'new', name: 'jack' }, 1, 2)()
```

### bind后new

```js
const obj = { name: 'allen' };
function say(...args) {
  console.log(this, args);
}

// bind返回的是函数
const fn = say.bind(obj, 'man', 27);

new fn(1) // {} ["man", 27, 1]
```

### 多次bind

> 第一次bind决定this,后续只会用其参数

```js
const obj = { name: 'allen' };
function say(...args) {
  console.log(this, args);
}

// bind返回的是函数
const fn = say.bind(obj, 'man', 27);

// {name: "allen"}  ["man", 27, 1, 2, 3, 4, 5, 6]
fn
  .bind({ name: 'jack' }, 1, 2)
  .bind({ name: 'tom' }, 3, 4)
  .bind({ name: 'tim' }, 5, 6)
  ()
```

### 手写call

```js
Function.prototype.myCall = function (context = window, ...args) {
  // 保证唯一
  const fnName = Symbol();

  context[fnName] = this;

  // 谁调用，this就指向谁
  const result = ctx[fnName](...args);

  // 使用完删除
  delete context[fnName];

  return result;
};
```

### 手写apply
```js
Function.prototype.myApply = function (context = window, args = []) {
  // 
  const fnName = Symbol();

  // 临时复制
  context[fnName] = this;

  // 谁调用，this就指向谁
  const result = context[fnName](...args);

  // 删除函数
  delete context[fnName];

  return result;
};
```

### 手写bind 
```js
Function.prototype.myBind = function (context = window, ...args) {
  const that = this;

  return function Fn(...args1) {
    // bind后调用 new Fn()
    if (this instanceof Fn) {
      return new that(...args, ...args1)
    }

    return that.call(context, ...args, ...args1);
  }
}

const obj = { name: 'allen' };
function say(...args) {
  console.log(this, args);
}
const fn = say.myBind(obj, 'man', 27);

fn(1); // allen ["man", 27, 1]
fn(2);  // allen ["man", 27, 2]
new fn(1) // say {} man 27 [1]

// {name: "allen"} (6) ["man", 27, 1, 2, 3, 4]
fn
  .myBind({ name: 'jack' }, 1, 2)
  .myBind({ name: 'tim' }, 3, 4)
  ()
```

