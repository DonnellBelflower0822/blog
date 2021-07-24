# 原型/原型链

> 对象可以通过 __proto__ 来寻找不属于该对象的属性，__proto__ 将对象连接起来组成了原型链。

## 构造函数/原型/实例

<img src='./img/base.png' />

```
实例.__proto__ === 构造函数.prototype
实例.__proto__.constructor === 构造函数
```

```js
// 构造函数
function Foo() { }

// prototype指向原型
Foo.prototype.say = function () { }

// 实例
const f1 = new Foo()

console.log(
  // true
  // 实例.__proto__ === 构造函数.prototype
  f1.__proto__ === Foo.prototype,
  // true
  // 实例.__proto__.constructor === 构造函数
  f1.__proto__.constructor === Foo
)
```

## 完整图例

- 每个函数(除了Function.protype.bind())都有一个prototype,指向原型
- 每个对象(除了null)都有一个__proto__ 指向构造函数的原型
- 对象通过__proto__找不属于该对象的属性,__proto__将对象和原型连起来组成原型链

<img src='./img/proto.png' />

```js
// 构造函数
function Foo() { }

// prototype指向原型
Foo.prototype.say = function () { }

// 实例
const f1 = new Foo()

console.log(
  // 指向构造函数的原型prototype
  f1.__proto__,
  // 构造函数的原型.__proto__ 指向 Object的原型
  f1.__proto__.__proto__ === Object.prototype,
  // 构造函数的原型.__proto__.constructor 指向Object构造函数
  f1.__proto__.__proto__.constructor === Object,
  // Object.__proto__ === Function.prototype
  f1.__proto__.__proto__.constructor.__proto__ === Function.prototype,
  // 构造函数的原型.__proto__.__proto__
  // => Object.prototype.__proto__ = null
  f1.__proto__.__proto__.__proto__ === null,

  // 构造函数的原型对象 => Function构造函数的原型
  Foo.__proto__ === Function.prototype,

  Foo.__proto__.constructor === Function.prototype,
  // 构造函数.原型对象.原型对象 => Object的原型
  Foo.__proto__.__proto__ === Object.prototype,
)
```

```js
// undefined
console.log(Function.prototype.bind().prototype)
```

## new

### 使用

```js
function Person() {
  this.name = 'allen'
}

// 使用new去初始化构造函数
const p = new Person()
console.log(p)  // Person { name: 'allen' }

// 不适用new
const p1 = Person()
console.log(p1)  // undefined
console.log(window.name)  // allen
```

### 构造函数体返回不同值
- 返回对象,数组,函数会直接作为实例
- 返回其他不会影响原来实例

```js
function Person() {
  this.name = 'allen'
  return 1   // 实例为Person {name: "allen"}
  return 'string'  //实例为 Person {name: "allen"}
  return null     // 实例为Person {name: "allen"}
  return undefined  // //实例为 Person {name: "allen"}

  return { name: 'tom' }  // 实例为{name: "tom"}
  return []   // 实例为 []

  return function () {  // 实例为  ƒ () { console.log('1') }
    console.log('1')
  } 
}

const p = new Person()
console.log(p)
```

### 手写new
```js
function myNew(constructor, ...args) {
  // 创建空对象
  const obj = {}
  // 将对象的__proto__ 指向构造函数的原型
  obj.__proto__ = constructor.prototype
  // 执行构造函数,并且将this执行obj
  const result = constructor.apply(obj, args)
  // 处理构造函数的返回值
  if (
    (result !== null && typeof result !== 'object')
    || typeof result !== 'function'
  ) {
    return obj
  }

  return result
}
```
