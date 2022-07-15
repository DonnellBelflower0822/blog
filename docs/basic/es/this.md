# this

## 资料
- https://muyiy.cn/blog/2/2.1.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE

## 任务
- bind/call/apply



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

