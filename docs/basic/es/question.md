# 题目

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