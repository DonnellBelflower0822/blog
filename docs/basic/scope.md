# 作用域和闭包

## 资料
- https://muyiy.cn/blog/2/2.1.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE

## 作用域

> 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

### 分类

> js采用静态作用域(语法作用域)

- 静态作用域(词法作用域): 函数的作用域在`函数定义`的时候就决定
- 动态作用域：函数的作用域是在`函数调用`的时候才决定的。

### 例子

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

## 作用域链 
当查找变量或者函数时，会先从`当前上下文的变量对象`中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局执行上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

### 完整执行流程
- 函数声明时用[[scope]]会记录当前的作用域链(重点)
- 初始化执行上下文
  - 变量对象
    - 形参初始化
    - 函数声明
    - 变量声明：与函数名一样不会覆盖
  - 作用域链：
    - 用函数[[scope]]去初始化作用域链
    - 将当前变量对象压入作用域链顶端

> 由于js采用静态作用域, 函数定义时就决定作用域 (用父级作用域和当前作用域去初始化当前函数的作用域链)

**示例代码**

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

**伪代码执行**

```ts
var scope = "global scope";
function checkscope(name) {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f();
}
checkscope('tom');

type ExectionContext = any[]

// 创建全局执行上下文
interface GlobalExectionContext {
    VO: Window & {
        scope: string | undefined
        checkscope: {
            (name): void,
            // 函数定义时就决定了其作用域
            '[[Scopes]]': [GlobalExectionContext['VO']]
        }
    }
}

// 当前执行上下文
// ExectionContext = [GlobalExectionContext]

// 执行checkscope('tom')

// 创建checkscope执行上文
interface CheckscopeExectionContext {
    AO: {
        name: 'tom',
        scope: string | undefined
        f: {
            (): void,
            '[[Scopes]]': [
                CheckscopeExectionContext['AO']
                GlobalExectionContext['VO'],
            ]
        }
    },
    '[[Scopes]]': [
        // ...GlobalExectionContext['VO']['checkscope']['[[Scopes]]']
        GlobalExectionContext['VO']
    ]
}

// 当前执行上下文
// ExectionContext = [GlobalExectionContext, CheckscopeExectionContext]

// 执行f()
interface FExectionContext {
    AO: {
    },
    '[[Scopes]]': [
        CheckscopeExectionContext['AO'],
        // ...CheckscopeExectionContext['AO']['f']['[[Scopes]]']
        GlobalExectionContext['VO'],
    ]
}

// 当前执行上下文
// ExectionContext = [GlobalExectionContext, CheckscopeExectionContext, FExectionContext]

// f函数里面的scope就会从 当前变量对象(AO) 和 [[Scopes]] 里面去一层层找scope变量的值
```

## 闭包

### 定义

- 闭包是指那些能够访问自由变量的函数。
- 闭包是指有权访问另外一个函数作用域中的变量的函数

**自由变量**

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。
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

### 用处

- 可以读取函数内部的变量，
- 让这些变量始终保持在内存中
- 是封装对象的私有属性和私有方法
- 避免全局变量污染

### 缺点
- 会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露

### 常见的内存泄漏
- 意外的全局变量
- 被遗忘的计时器
- 闭包

## 闭包执行过程

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

## 块级作用域

```ts
var data: Array<() => void> = [];

for (let i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
}

data[0]();
data[1]();
data[2]();

interface LetGlobalContext {
    VO: {
        data: Array<() => void> | undefined
    }
}

interface BlockContext {
    VO: {
        i: number,
        // Scopes: [LetGlobalContext.VO, BlockContext.VO]
        // 所以i的存在于BlockContext.VO
        unknowFn: () => {}
    }
}
```

## 例子

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
