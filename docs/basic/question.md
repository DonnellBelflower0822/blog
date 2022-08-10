# 题目

- https://juejin.cn/post/6959043611161952269
- https://juejin.cn/post/6946136940164939813#heading-64

## 输出题: 输出什么

```js
var obj = {
    say: function() {
        function _say() {
            console.log(this);
        }
        console.log(obj);
        return _say.bind(obj);
    }(),
};
obj.say();
```

```js
// 1、赋值语句是右执行的,此时会先执行右侧的对象
var obj = {
    // 2、say 是立即执行函数
    say: function() {
        function _say() {
            // 5、输出 window
            console.log(this);
        }
        // 3、编译阶段 obj 赋值为 undefined
        console.log(obj);
        // 4、obj是 undefined，bind 本身是 call实现，
        // 【进阶3-3期】：call 接收 undefined 会绑定到 window。
        return _say.bind(obj);
    }(),
};
obj.say();
```


## 题目: 无限累加的函数add

```js
add(1); // 1
add(1)(2);  // 3
add(1)(2)(3)； // 6
add(1)(2)(3)(4)； // 10 
```

**答案**

```js
function add(a) {
    const fn = (b) => {
        fn.sum += b
        return fn
    }
    fn.toString = function () {
        return fn.sum
    }
    fn.sum = a
    return fn
}

console.log(add(1) + '');
console.log(add(1)(2) + '');
console.log(add(1)(2)(3) + '');
console.log(add(1)(2)(3)(4) + '');
```

## 题目: 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

`var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];`

## 题目: 对象扁平化
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

/**
// 输出
{
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b.0': 1,
  'b.1': 3,
  'b.2.a': 2,
  'b.2.b': 3,
  c: 3
}
 */
```

**参考**

> `Object.keys([1,2,3,4])`输出`['0', '1', '2', '3']`

```js

function flattern(obj, path = []) {
    return Object.keys(obj).reduce((newObject, key) => {
        const value = obj[key]
        const currentPath = [...path, key]
        if (typeof value === 'object') {
            return {
                ...newObject,
                ...flattern(value, currentPath)
            }
        }

        return {
            ...newObject,
            [currentPath.join('.')]: value
        }
    }, {})
}

console.log(flattern(obj))
```

## 实现数组扁平化

> `[1, 2, [1, [2, 3, [4, 5, [6]]]]]` 变成 `[ 1, 2, 1, 2, 3, 4, 5, 6 ]`

**Array.flat**

```ts

interface Array<T> {
    flat<A, D extends number = 1>(
        this: A,
        depth?: D
    ): FlatArray<A, D>[]
}
```

```js
function flattern(array = []) {
    return array.reduce((prevArr, item) => [
        ...prevArr,
        ...(Array.isArray(item) ? flattern(item) : [item])
    ], [])
}

var arr = [1, 2, [1, [2, 3, [4, 5, [6]]]]]
console.log(flattern(arr))  // [ 1, 2, 1, 2, 3, 4, 5, 6 ]

console.log(arr.flat()) // [ 1, 2, 1, [ 2, 3, [ 4, 5, [ 6 ] ] ] ]
console.log(arr.flat(Infinity)) // [ 1, 2, 1, 2, 3, 4, 5, 6 ]
```

## setTimeout去模拟setInterval
```js
function mySetInterval(fn, ms, ...args) {
    const that = this
    let timer = null
    function interval() {
        timer = setTimeout(() => {
            fn.apply(that, args)
            interval()
        }, ms)
    }

    interval()

    return {
        clear() {
            clearTimeout(timer)
        }
    }
}
```

## 原型输出题

```js
function Foo () {
    getName = function () { alert(1) }
    return this
}
Foo.getName = function () { alert(2) }
  
Foo.prototype.getName = function () { alert(3) }

var getName = function () { alert(4) }

function getName () { alert(5) }


Foo.getName(); 
getName(); 
Foo().getName(); 
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

## 题目

```js
例1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

例2：
输入： nums = [3,2,4], target = 6
输出： [1,2]

例3：
输入： nums = [3,3], target = 6
输出： [0,1]
```

```js
const getIndexArray = (arr, target) => {
    const map = new Map()
    for (let i = 0; i < arr.length; i += 1) {
        if (map.has(target - arr[i])) {
            return [
                map.get(target - arr[i]),
                i
            ]
        }

        map.set(arr[i], i)
    }
}

console.log(getIndexArray([2, 7, 11, 15], 9))
console.log(getIndexArray([3, 2, 4], 6))
console.log(getIndexArray([3, 3], 6))
```