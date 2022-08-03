# 原型/原型链

## 资料
- https://muyiy.cn/blog/5/5.1.html#%E5%BC%95%E8%A8%80

## 任务
- 原型
- 原型链
- 继承
- new
- instanceof
- class

<img src="./img/proto.png" />

## 原型prototype

- Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
- Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
- 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
- 函数的 prototype 是一个对象，也就是原型
- 对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链

## 特殊
```js
Function.__proto__ === Function.prototype
```

### 自定义构造函数
<img src="./img/proto-0.png" />

```js
function Foo() { }

Foo.prototype.say = function () {
    console.log('say')
}

const foo = new Foo()

console.log(foo.__proto__ === Foo.prototype)    // true
console.log(Foo.prototype.constructor === Foo)  // true
```

### 原型的关系网

> 原型其实也是`Object构造函数`new出来的实例

<img src="./img/proto-1.png" />

```js
function Foo() { }

const foo = new Foo()

console.log(Foo.prototype.__proto__ === Object.prototype)  // true
console.log(Foo.prototype.__proto__.constructor === Object)  // true

console.log(Function.prototype.__proto__ === Object.prototype)  // true
console.log(Function.prototype.__proto__.constructor === Object)  // true
```

### 构造函数的关系网

> 构造函数其实是`Function构造函数`new出来的实例

<img src="./img/proto-2.png" />

```js
function Foo() { }

console.log(Foo.__proto__ === Function.prototype)   // true
console.log(Foo.__proto__.constructor === Function) // true

console.log(Object.__proto__ === Function.prototype)    // true
console.log(Object.__proto__.constructor === Function)  // true
```

### Function和Object构造函数的关系网

<img src="./img/proto-3.jpg" />

```js
console.log(Object.prototype.__proto__) // null

console.log(Object.__proto__ === Function.prototype)    // true

console.log(Function.prototype === Function.__proto__)  // true

console.log(Function.prototype.__proto__ === Object.prototype)  // true
```

## instanceof

### 原理

> 实例的原型对象(`__proto__`) 等于 构造函数的原型对象 `proptype`

```js
instance.__proto__ === constructor.prototype
```

### 例子

<img src="./img/prototype.jpg" />

```js
function Person() {
}

const man = new Person()

console.log(man instanceof Function)    // false
console.log(man instanceof Person)  // true
console.log(man instanceof Object)  // true

console.log(man.__proto__ === Person.prototype) // true
console.log(Person.prototype.__proto__ === Object.prototype)    // true
console.log(Object.prototype.__proto__ === null)

console.log(Function instanceof Object) // true
console.log(1, Function.__proto__ === Function.prototype)
console.log(2, Function.prototype.__proto__ === Object.prototype)

console.log(Object instanceof Function)
console.log(1, Object.__proto__ === Function.prototype)
```

### 手写instanceof

```js
function Person() {
}

const man = new Person()

console.log(man instanceof Function)    // false
console.log(man instanceof Person)  // true
console.log(man instanceof Object)  // true

console.log(Function instanceof Object) // true

console.log(Object instanceof Function) // true

function myInstanceOf(instance, Constructor) {
    // 处理null和undefined的情况
    if (instance === undefined || instance === null) {
        throw new Error('error')
    }

    // 处理普通类型
    if (typeof instance !== 'object' && typeof instance !== 'function') {
        return false
    }
    
    const { prototype } = Constructor

    while (true) {
        if (instance.__proto__ === prototype) {
            return true
        }

        instance = instance.__proto__
        if (instance === null) {
            return false
        }
    }
}

console.log('myInstanceOf', myInstanceOf(man, Function))
console.log('myInstanceOf', myInstanceOf(man, Person))
console.log('myInstanceOf', myInstanceOf(man, Object))
console.log('myInstanceOf', myInstanceOf(Function, Object))
console.log('myInstanceOf', myInstanceOf(Object, Function))
```

## new

### 基础使用

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
1. 创建一个新对象。
2. 这个新对象会被执行[[Prototype]]连接。__proto__ = 构造函数.prototype
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

```js
function customNew(Construtor, ...args) {
    const obj = new Object()

    obj.__proto__ = Construtor.proptype

    const result = Construtor.apply(obj, args)

    return result instanceof Object ? result : obj
}

const woman = customNew(Person, 'tiya')
console.log(woman)
```




## 继承

### 原型链上继承

- 在原型对象上的引用类型会互相影响

#### 代码

```js
// 原型链继承
function Animal() {
  this.base = 'animal'
  this.color = ['red', 'yellow']
}

Animal.prototype.say = function () {
  console.log(this.type)
}

function Dog() {
  this.type = 'dog'
}

// 在原型对象上去继承Animal
Dog.prototype = new Animal()

const dog1 = new Dog()
const dog2 = new Dog()

dog1.color.push('black')
// [ 'red', 'yellow', 'black' ]
console.log(dog2.color)
```

<img src='./img/extend1.png' />

### 利用构造函数继承

```js
// 借用构造函数继承
function Animal() {
  this.colors = ['red']
}

function Dog() {
  // 在构造函数里面继承
  Animal.call(this)
}

const xiaohuang = new Dog()
const wangcai = new Dog()

xiaohuang.colors.push('yellow')

console.log(wangcai.colors) // ['red']
console.log(xiaohuang.colors) // ['red','yellow']
```

#### 问题

- 只能继承父类的实例属性和方法，不能继承父类的原型对象
- 无法实现复用，每个子类都会有父类实例函数的副本，影响性能

```js
// 借用构造函数继承
function Animal() {
  this.colors = ['red']
}

Animal.prototype.say = function () {
  console.log(this.colors)
}

function Dog() {
  // 无法使用Animal.prototype
  Animal.call(this)
}

const xiaohuang = new Dog()
const wangcai = new Dog()

// ** 无法继承父类原型对象的属性或方法
console.log(wangcai.say)  // undefined

console.log(wangcai.colors === xiaohuang.colors)// false
```

### 组合继承

> 集合原型链继承和借助构造函数继承

1. **借助原型链继承：复用父类的实例和原型上的属性和方法，**
2. **借助构造函数继承：用父类的实例属性和方法去覆盖原型链上**

```js
// 组合继承
function Animal() {
  this.colors = ['red']
}

Animal.prototype.say = function () {
  console.log(this.colors)
}

function Dog() {
  // **2** 用构造函数继承去覆盖父类的实例属性和方法
  Animal.call(this)
}

// **1**将父类的实例作为原型对象
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

const xiaohuang = new Dog()
const wangcai = new Dog()

console.log(wangcai.say)  // undefined

console.log(wangcai.colors === xiaohuang.colors)// false
```

#### 缺点

- 调用两次`new Animal()`
- 存在两份Animal实例属性和方法（构造函数继承的会覆盖原型链上继承）

### 原型式继承

> 利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型

```js
// 原型式继承
function createObject(obj) {
  function F() { }
  F.prototype = obj
  return new F()
}

const animal = {
  colors: ['red', 'yellow'],
  name: 'animal'
}

const xiaohuang = createObject(animal)
xiaohuang.colors.push('green')
xiaohuang.name = 'xiaohuang'

const wangcai = createObject(animal)
// 对于引用类型地址一样，[ 'red', 'yellow', 'green' ]
console.log(wangcai.colors)

console.log(wangcai.name) // animal
```

#### 缺点

- 只是对对象进行浅层赋值
- 无法传递参数

#### Object.create

```js
const animal = {
  colors: ['red', 'yellow'],
  name: 'animal'
}

const xiaohuang = Object.create(animal)
xiaohuang.colors.push('green')

// 是对实例赋值
xiaohuang.name = 'xiaohuang'

const wangcai = Object.create(animal)
// 对于引用类型地址一样，[ 'red', 'yellow', 'green' ]
console.log(wangcai.colors)

console.log(wangcai.name) // animal
```

### 寄生式继承

> 在原型式继承的基础上，增加对象，返回实例

```js
function createAnimal(obj) {
  const clone = Object(obj)
  // 只是比原型式继承增强了可以新增属性和方法
  clone.type = 'animal'
  clone.say = function () {
    console.log('hello allen')
  }
  return clone
}

const animal = {
  colors: ['red', 'yellow'],
  name: 'animal'
}

const wangcai = createAnimal(animal)
const xiaohuang = createAnimal(animal)
```

#### 缺点（跟原型式继承一样）

- 多个实例的引用类型的地址一样
- 无法传递参数


### 寄生组合式继承

```js
// 寄生组合式继承

function inheritPrototype(Sub, Parent) {
  // 创建一个父类原型对象的副本
  const prototype = Object.create(Parent.prototype)

  // 将原型对象的构造函数执行子类
  prototype.constructor = Sub

  // 指定子类的原型对象
  Sub.prototype = prototype
}

function Animal() {
  this.colors = ['red']
}

Animal.prototype.say = function () {
  console.log(this.colors)
}

function Dog() {
  // 增加父类的实例属性和方法
  Animal.call(this)
  this.name = 'dog'
}

inheritPrototype(Dog, Animal)

Dog.prototype.wang = function () {
  console.log('wang')
}

const xiaohuang = new Dog()
const wangcai = new Dog()
```

### 混入方式继承多个对象

```js
// 混入方式继承多个对象

function Animal() {
  this.colors = ['red']
}

Animal.prototype.say = function () {
  console.log(this.colors)
}

function Dog() {
  this.name = 'dog'
}

Dog.prototype.tell = function () { }

function Wang() {
  // 增加父类的实例属性和方法
  Animal.call(this)
  Dog.call(this)
}

Wang.prototype = Object.create(Animal.prototype)
Object.assign(Wang.prototype, Dog.prototype)

Wang.prototype.constructor = Wang

const wangcai = new Wang()
```


### es6-class

```js
class Animal {
  constructor() {
    this.colors = ['red']
  }
  say() {
    console.log(this.colors)
  }
}

class Dog extends Animal {
  constructor(props) {
    super(props)
    this.name = 'dog'
  }

  tell() { }
}
```

### extends原理

```js
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  // 子级的原型对象使用父级的原型对象
  subClass.prototype = Object.create(
    superClass && superClass.prototype,
    // 指定prototype.constructor为subClass
    {
      constructor: { value: subClass, writable: true, configurable: true }
    }
  );

  if (superClass) {
    _setPrototypeOf(subClass, superClass);
  }
}
```


