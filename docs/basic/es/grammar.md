# 语法篇

## 块级作用域

> 只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 块级作用域示例
```js
{
    var a = 0
    let b = 1
}

console.log(a)  // 0
console.log(b)  // VM11248:7 Uncaught ReferenceError: b is not defined
```

### 作用域分析

```js
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// 作用域
{
    // 父级块级作用域(let i = 0; i < 3; i++)
    let i

    {
        // 内部块级作用域 (console.log(i))
    }
}
```

### 循环体的块级作用域判断

```js
for (let i = 0; i < 3; i++) {
    let i = 'hello'
    console.log(i);
}

// 作用域
{
    // 父级块级作用域
    let i = 3

    {
        // 内部块级作用域
        let i = 'hello'
        console.log(i)
    }
}
```

### 暂时死区

> 使用let和const命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”

```js
console.log(b)  // VM75:1 Uncaught ReferenceError: b is not defined

let b = 2       // 在代码块内，使用let命令声明变量之前，该变量都是不可用的(暂时性死区)
```

```js
console.log(typeof a)   // undefined

console.log(typeof b)   // Uncaught ReferenceError: b is not defined
let b
```

### 重复声明

> let不允许在相同作用域内，重复声明同一个变量。

```js
// 重复声明
function fn() {
    let a
    let a
}
fn(1)

// 重复声明
function fn1(args) {
    let args
}
fn1(2)

// 不报错
function fn2(args) {
    {
        let args
    }
}
fn2(3)
```

### 函数与块级作用域 
- ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
- ES6
  - 允许在块级作用域内声明函数。
  - 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
  - 同时，函数声明还会提升到所在的块级作用域的头部

```js
function f() {
    console.log('I am outside!');
}

(function () {
    if (false) {
        // 重复声明一次函数f
        function f() {
            console.log('I am inside!');
        }
    }

    f();    // TypeError: f is not a function
}());
```

**等价于**

```js
(function () {
    let f = undefined
    if (false) {
        // 重复声明一次函数f
        f = function () {
            console.log('I am inside!');
        }
    }

    f();    // TypeError: f is not a function
}());
```

## string

```ts
interface String {
    includes(searchString: string, position?: number): boolean;

    startsWith(searchString: string, position?: number): boolean;

    endsWith(searchString: string, endPosition?: number): boolean;

    repeat(count: number): string;
}
```
