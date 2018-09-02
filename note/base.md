# 基础

## JS组成
- 核心ECMAScript（主要是JS核心语法）
- 文档对象模型DOM：提供访问和操作网页内容的方法和接口
    - DOM级别
        - DOM1级(0级)：
        - DOM2级：
        - DOM3级：
- 浏览器对象模型BOM：提供与浏览器交互的方法和接口

## `<script>`的async属性
- 异步加载js
- 不能保证顺序
- 只适用外部js文件
- 异步js一定在onload之前执行，可能在DOMContentLoaded事件触发之前或之后执行

```html
<script>
  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded')
  })
  window.addEventListener('load', function () {
    console.log('load')
  })
</script>
<script src="demo1.js"
        async="async"
        type="text/javascript"></script>
<script src="demo2.js"
        async="async"
        type="text/javascript"></script>
```

### 异步加载js脚本(扩展)
- 给script标签增加async属性
- 动态创建script
```javascript
function addScript (src) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)
}
```

## loaded和DOMContentLoaded的区别
- loaded:页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了
- DOMContentLoaded:仅当DOM加载完成，不包括样式表，图片，flash

## 文档类型DOCTYPE
> 告诉浏览器使用什么样的文档类型定义(DTD)来解析

### 常见
- 过渡型
- 框架集型
- 严格型
- html5
```html
<!-- html5 -->
<!DOCTYPE html>
```

## 数据类型
- undefined
- null
- boolean
- number
- string
- object

### 判断数据类型
#### `typeof`
```javascript
console.log(typeof a) // undefined
console.log(typeof 'str') // string
console.log(typeof 2) // number
console.log(typeof true)  // boolean
console.log(typeof console.log) // function
console.log(typeof null)  // object
console.log(typeof {})  // object
console.log(typeof [])  // object
```

#### `instanceof`
> 主要针对object对象
```javascript
console.log([] instanceof Array)  // true
console.log([] instanceof Object) // true
console.log({} instanceof Array)  // false
console.log({} instanceof Object) // true
console.log(console.log instanceof Function)  // true
console.log(console.log instanceof Object)  // true
```

#### `Object.prototype.toString.call()`
> 此方法比较准确，得到`'[object XXXX]'`
```javascript
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call('str')) // [object String]
console.log(Object.prototype.toString.call(2)) // [object Number]
console.log(Object.prototype.toString.call(true)) // [object Boolean]
console.log(Object.prototype.toString.call(null)) // [object Null]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call([])) // [object Array]
```


#### 检测数组
```javascript
console.log([] instanceof Array)  // true
console.log(Array.isArray([]))  // true
console.log([1, 2] + '')  // 1,2
console.log([1, 2] + [3, 4])  // 1,23,4
```

### null和undefined的区别
- null:代表一个空对象指针，使用typeof得到object
- undefined：声明一个变量未初始化时，就会得到undefined

```javascript
console.log(null == undefined)  // true
```

### 转换为false的值
> `[],{}`不会转换为false
```
console.log(!'')
console.log(!false)
console.log(!0)
console.log(!NaN)
console.log(!undefined)
console.log(!null)
```

### 浮点数精度
```javascript
// 解决
function calculate(num){
  return parseFloat((num).toFixed(10))
}
```

### NaN
- 非数值(Not a Number)是一个特殊的数值
- isNaN会尝试转换成数值

```javascript
console.log(NaN == NaN) // false
console.log(isNaN(NaN)) // true
console.log(isNaN('2222')) // false
console.log(isNaN(22))  // false
console.log(isNaN('s222'))  // true
```



## 运算符
```javascript
console.log(false && '返回啥') // false
console.log(false || '返回啥') // 返回啥
```



## 引用类型
```
var obj = {
    name: 'allen'
}
function f (obj) {
    obj.name = 'tom'
}
f(obj)
console.log(obj)    // {name:'tom'}
```

## 数组
```
[].push(1,2)    // [1,2]
[1,2].pop()     // 2
[1,2].shift()   // 1
[1,2].unshift(2)    // [2,1,2]
[1,15,5,10].sort((a,b)=>a-b)    // [1,5,10,15]
[1,2].concat([2,4],[3]) // [1,2,2,4,3]
[1,2,3,4,5].indexOf(3)      // 2
[1,2,3,4,3,5].lastIndexOf(3)    // 4
```

### 迭代方法
- every():对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。
- some():对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。
- filter():对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
- forEach():对数组中的每一项运行给定函数。这个方法没有返回值。
- map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

```javascript
var arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]
// 判断数据
var res1 = arr.every((item, index, arr) => item > 2)
console.log(res1) // false
var res2 = arr.some((item, index, arr) => item > 2)
console.log(res2) // true
// 过滤数据
var res3 = arr.filter((item, index, arr) => item > 2)
console.log(res3) // [3, 4, 5, 4, 3]
// 对数据进行处理
var res4 = arr.map((item, index, arr) => item * 2)
console.log(res4) // [2, 4, 6, 8, 10, 8, 6, 4, 2]
// 可用于累加
var res5 = arr.reduce((prev, cur) => prev + cur)
console.log(res5) // 25
arr.forEach((item,index,arr)=>{
})
```