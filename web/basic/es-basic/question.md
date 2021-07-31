# 问题

## 对象扁平化

```js
const obj = {
 a: {
        b: 1,
        c: 2,
        d: {e: 5}
    },
 b: [1, 3, {a: 2, b: 3}],
 c: 3
}
flatten(obj)
// 返回
{
 'a.b': 1,
 'a.c': 2,
 'a.d.e': 5,
 'b[0]': 1,
 'b[1]': 3,
 'b[2].a': 2,
 'b[2].b': 3
  c: 3
}
```

## 数组扁平化

> 题目

```js
flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]])
// 得到：
[1,2,1,2,3,4,5,6]
```

> 实现

```js
function flatter(...args) {
  return args.reduce((arr, item) => [
    ...arr,
    // 是数组递归
    ...(Array.isArray(item) ? flatter(...item) : [item])
  ], [])
}
```

## 实现`add(1, 2, 3)(4)(5)`功能

> 实现

```js
function add(...args) {
  let allArgs = [...args]
  function fn(...newArgs) {
    allArgs = [...allArgs, ...newArgs]
    return fn
  }

  fn.toString = () => {
    return allArgs.reduce((a, b) => a + b, 0)
  }

  return fn
}

console.log(add(1, 2, 3)(4)(5) + '')
```

## setTimeout去模拟setInterval

### setInterval的缺点

> 实现

```js
function mockSetInterval(fn, timeout) {
  let timer = null
  const interval = () => {
    timer = setTimeout(() => {
      fn()
      interval()
    }, timeout)
  }

  interval()

  return {
    clear() {
      clearTimeout(timer)
    }
  }
}
```

## forEach能退出循环

### 抛出异常

```js
try {
  [1, 2, 3, 4].forEach((item, index) => {
    if (index === 2) {
      throw new Error('出错')
    }
    console.log(item)
  })
} catch (e) {
  console.log(e)
}
```

### 重写forEach

```js
Array.prototype.myForEach = function (fn) {
  for (let i = 0;i < this.length;i += 1) {
    const result = fn(this[i], i)
    if (result === false) {
      break
    }
  }
}

new Array(1, 2, 3, 4).myForEach((item, index) => {
  if (index === 2) {
    return false
  }
  console.log(item)
})
```

## 深浅拷贝

### 对象的浅拷贝

> Object.assign和{...}

```js
const obj = {}
const oldObj = { hello: 'world', dep: { a: 1 } }

Object.assign(obj, oldObj)

console.log(obj, oldObj)

const obj1 = { ...oldObj }
```

### 数组的浅拷贝怒

```js
let arr = [1, 2, 3];

const newArr = arr.concat()
arr[1] = 20

console.log(newArr) // [1,2,3]


const newArr1 = arr.slice()
arr[1] = 30
console.log(newArr1)  // [1,20,3]

const newArr2 = [...arr]
arr[1] = 40
console.log(newArr2)  // [ 1, 30, 3 ]
```

### 手写浅拷贝

```js
function shallowClone(target) {
  if (typeof target === 'object' && target !== null) {
    const clone = target.constructor()

    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        clone[key] = target[key]
      }
    }

    return clone
  }

  return target
}
```

### 深拷贝-JSON.stringify

```js
function deepClone1(target) {
  return JSON.parse(JSON.stringify(target))
}

deepClone1({
  // 被干掉
  a: undefined,
  b: 1,
  c: [1, 2, 3],
  d: { f: 'g' },
  // 被干掉
  h: function () {
    console.log('h')
  },
  // 变成{}
  i: /\d/,
  // 变成字符串
  j: new Date()
})
```

### 深拷贝 - 遍历递归

```js
function deepClone(target, hash = new WeakMap) {
  if (typeof target !== 'object' || target === null) {
    return target
  }

  const { constructor } = target

  if (constructor === Date) {
    return new Date(target)
  }

  if (constructor === RegExp) {
    return new RegExp(target)
  }

  // 如果对象已经处理过了，就直接拿处理过的直接返回
  if (hash.has(target)) {
    return hash.get(target)
  }

  const clone = constructor()

  // 保存对象，防止递归引用
  hash.set(target, clone)

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = deepClone(target[key], hash)
    }
  }

  return clone
}
```

```js
const data = {
  a: undefined,
  b: 1,
  c: [1, 2, 3],
  d: { f: 'g' },
  h: function () {
    console.log('h')
  },
  i: /\d/,
  j: new Date(),
}
data.k = data

const newData = deepClone(data)
```

## 防抖/截流

### 说明
- 函数防抖：debounce
  - 说明
    - 是指在事件被触发 n 秒后再执行回调
    - 如果在这 n 秒内事件又被触发，则重新计时。
  - 场景
    - 这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
- 函数节流：throttle
  - 说明
    - 是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，
    - 如果在同一个单位时间内某事件被触发多次，只有一次能生效。
  - 场景
    - 节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

### 手写debounce

```js
function debounce(fn, dely) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    const that = this
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, dely);
  }
}
```

### 手写throttle

```js
function throttle(fn, timeout) {
  let timer = null

  return function (...args) {
    if (timer) {
      return
    }

    const that = this
    timer = setTimeout(() => {
      fn.apply(that, args)
      clearTimeout(timer)
      timer = null
    }, timeout);
  }
}
```

##  ["1", "2", "3"].map(parseInt) 

> parseInt的ts定义
```ts
declare function parseInt(string: string, radix?: number): number;
```

```js
// [1,NaN,NaN]
console.log(["1", "2", "3"].map(parseInt));

["1", "2", "3"].map((item, index, array) => {
  // parseInt(1,0)
  // parseInt(2,1)
  // parseInt(3,2)
  console.log(item,index)
  return parseInt(item, index, array)
})
```

## 数组去重

```js
const arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

function unique1(arr) {
  return [...new Set(arr)]
}

function unique2(arr) {
  return arr.reduce((newArr, element) => {
    if (newArr.includes(element)) {
      return newArr
    }
    return [...newArr, element]
  }, [])
}
```

## 替换eval

```js
const response = 'this.wx_errcode=402;this.wx_code=1024'
const vm = {}
new Function(response).call(vm)
// {wx_errcode:402;wx_code:1024}
console.log(vm)
```

```js
 const response = 'window.wx_errcode=402;window.wx_code=1024'
function myEval(str) {
  const script = document.createElement('script')
  script.text = str
  script.type = 'text/javascript'
  document.body.appendChild(script)
  document.body.removeChild(script)
}
myEval(response)

console.log(window.wx_errcode)
```