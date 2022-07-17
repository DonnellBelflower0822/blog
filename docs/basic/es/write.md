# 手写系列

## 资料
- https://muyiy.cn/blog/7/7.1.html#%E5%BC%95%E8%A8%80

## 任务
- 截流/防抖
- 深浅拷贝

## 浅拷贝

### 对象浅拷贝Object.assign

```js
const a = {
    name: "allen",
    info: {
        year: '1994'
    }
}

const b = Object.assign({}, a)
a.name = 'jack'
a.info.year = '1999'

// { name: 'jack', info: { year: '1999' } }
console.log(a)
// { name: 'allen', info: { year: '1999' } }
console.log(b)
```

### 对象浅拷贝spread

```js
const a = {
    name: "allen",
    info: {
        year: '1994'
    }
}

const b = { ...a }
a.name = 'jack'
a.info.year = '1999'

// { name: 'jack', info: { year: '1999' } }
console.log(a)
// { name: 'allen', info: { year: '1999' } }
console.log(b)
```

### 数组浅拷贝 spread

```js
const arr = [1, { name: 'allen', year: 1994 }]
const arr1 = [...arr]

arr[0] = 2
arr[1].name = 'jack'

// arr [ 2, { name: 'jack', year: 1994 } ]
console.log('arr', arr)
// arr1 [ 1, { name: 'jack', year: 1994 } ]
console.log('arr1', arr1)
```

### 数组浅拷贝 Array.prototype.slice.call

```js
const arr = [1, { name: 'allen', year: 1994 }]
const arr1 = Array.prototype.slice.call(arr)

arr[0] = 2
arr[1].name = 'jack'

// arr [ 2, { name: 'jack', year: 1994 } ]
console.log('arr', arr)
// arr1 [ 1, { name: 'jack', year: 1994 } ]
console.log('arr1', arr1)
```

### 手写浅拷贝

```js
const myShallowClone = (data) => {
    if (typeof data !== 'object' || data === null) {
        return data
    }

    const newData = new data.constructor()

    for (let i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
            newData[i] = data[i]
        }
    }

    return newData
}
const obj = { a: 1, b: { c: 2 } }

const obj1 = myShallowClone(obj)

obj.a = 3
obj.b.c = 4

console.log(obj, obj1)
```

## 深拷贝

### 深拷贝 JSON.parse(JSON.stringify())

**缺点**
- `Date`类型会被转换成 `字符串`
- `RegExp` 转换成 `空对象{}`
- 直接忽略的值类型  
  - undefined
  - function
  - Symbol
- 循环引用的直接报错`TypeError: Converting circular structure to JSON`

```js
const obj = {
    str: 'string',
    num: 0,
    bool: true,
    null: null,
    arr: [1, 2],
    o: {
        f: 'f'
    },

    // 转成字符串
    date: new Date(),

    // 转成空对象 {}
    reg: /\d/,

    // 忽略
    undefined: undefined,
    console: console.log,
    symbol: Symbol()
}

var a = JSON.parse(JSON.stringify(obj))
// {
//     "str": "string",
//     "num": 0,
//     "bool": true,
//     "null": null,
//     "arr": [1, 2],
//     "o": {
//         "f": "f"
//     },
//     "reg": {},
//     "date": "2022-07-16T12:28:53.881Z"
// }
```

### 手写深拷贝
- 递归
- 遍历

```js
const cloneDeep = (data, weakMap = new WeakMap()) => {
    // 排除基础类型的深度拷贝
    if (typeof data !== 'object' || data === null) {
        return data
    }

    const { constructor } = data

    // 日期拷贝
    if (constructor instanceof Date) {
        return new Date(data)
    }

    // 正则拷贝
    if (constructor instanceof RegExp) {
        return new RegExp(data)
    }

    // 防止递归
    if (weakMap.has(data)) {
        return weakMap.get(data)
    }

    // 构造
    const newData = new constructor()

    weakMap.set(data, newData)

    // 遍历
    Reflect.ownKeys(data).forEach(i => {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
            // 递归
            newData[i] = cloneDeep(data[i], weakMap)
        }
    })

    return newData
}
```

**测试普通正常代码**

```js
// 测试代码
var obj = {
    string: 'str',
    number: 0,
    boolean: true,
    undefined: undefined,
    null: null,

    date: new Date(),

    reg: /\d/,

    console: console.log,

    o: {
        a: 1,
        b: 2
    },

    a: [1, 2, { c: 3, d: 4 }]
}

const newObj = cloneDeep(obj)

console.log(obj.o === newObj.o)
console.log(newObj)
```

**测试循环引用**

```js
// 测试循环引用代码

var obj1 = {}
var obj2 = { a: obj1 }
obj1.obj2 = obj2

// 报错
// console.log(JSON.parse(JSON.stringify(obj1)))

const a = cloneDeep(obj1)
console.log(a)
```

## 截流 throttle

### 解释
- 是指规定一个`单位时间`，在这个单位时间内，只能有`一次触发事件`的回调函数执行，
- 如果在同一个单位时间内某事件被触发多次，只有`一次`能生效。

### 适用场景
- window.onresize() 事件、
- mousemove 事件、
- 上传进度

### 采用时间戳版本的截流

```js
function dateThrottle(fn, ms = 50) {
    let time = Date.now()

    return function (...args) {
        const currentTime = Date.now()

        if (currentTime - time < ms) {
            return
        }

        time = currentTime
        fn.apply(this, args)
    }
}
```

### 采用定时器版本的截流

```js
function timerThrottle(fn, ms = 50) {
    let timer = null

    return function (...args) {
        if (timer) {
            return
        }
        const that = this
        timer = setTimeout(function () {
            fn.apply(that, args)
            timer = null
        }, ms)
    }
}
```

## 防抖

### 说明
- 是指在事件被触发 n 秒后再执行回调
- 如果在这 n 秒内事件又被触发，则重新计时。

### 适用场景
- 这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

### 手写

```js
function debounce(fn, ms) {
    let timer = null

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, ms)
    }
}
```