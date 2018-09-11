# JS基础

## 数据类型
### 数据类型
- string
- number
- boolean
- null：空值
- undefined：未定义的值
- object

### 判断数据类型
```javascript
```

### 数字number
#### NaN
> 非数字值，NaN不等于自身，用isNaN()去判断，isNaN()使用尝试转换成数字去判断
```javascript
console.log(NaN == NaN) // false
console.log(isNaN(NaN)) // true
console.log(isNaN('s10')) // true
console.log(isNaN('10'))  // true
```

### 布尔值boolean
#### 转换为false
```javascript
console.log(Boolean(''))  // false
console.log(Boolean(undefined)) // false
console.log(Boolean(null))  // false
console.log(Boolean(false)) // false
console.log(Boolean(0)) // false
console.log(Boolean(-0))  // false
// 所有对象(数组)都会转换成true
console.log(Boolean([]))  // true
console.log(Boolean({}))  // true
```

### 包装对象
- Number()
- String()
- Boolean()

```javascript
var s='hello'   // var s = String('hello')
s.substr(1,2)   // s.substr(1,2)
```

## 作用域



