# 类型转换

## 转boolean

- 转换false: `undefined, null, false, NaN, '', 0, -0`
- 其余转为true

```js
console.log(Boolean())  // false
console.log(Boolean(false))  // false
console.log(Boolean(undefined))  // false
console.log(Boolean(null))  // false
console.log(Boolean(0))  // false
console.log(Boolean(-0))  // false
console.log(Boolean(NaN))  // false
console.log(Boolean(''))  // false
```

## 转Number
```js
console.log(Number()) // 0

console.log(Number(true)) // 1
console.log(Number(false))  // 0

console.log(Number(0))  // 0
console.log(Number(-0)) // -0
console.log(Number(NaN))  // NaN

console.log(Number(null)) // 0

console.log(Number(undefined))  // NaN

console.log(Number('')) // 0
console.log(Number(' '))  // 0
console.log(Number('-1')) // -1
console.log(Number('2'))  // 2
console.log(Number('2xx'))  // NaN
console.log(Number('xx2'))  // NaN
console.log(Number('2 2'))  // NaN

console.log(Number({})) // NaN
console.log(Number({ a: 1 })) // NaN

console.log(Number([])) // 0
console.log(Number([1])) // 1
console.log(Number(['1'])) // 1
console.log(Number(['1a'])) // NaN
console.log(Number([1, 2])) // NaN
```

## 转String
```js
console.log(String()) // ''

console.log(String(true)) // 'true'
console.log(String(false))  // 'false'

console.log(String(0))  // '0'
console.log(String(-0)) // '0'
console.log(String(NaN))  // 'NaN'

console.log(String(null)) // 'null'

console.log(String(undefined))  // 'undefined'

console.log(String({})) // [object Object]
console.log(String({ a: 1 })) // [object Object]
console.log(String({ a: 1, toString() { return 'hello' } })) // hello

console.log(String([])) // ''
console.log(String([1])) // '1'
console.log(String([1, 2])) // '1,2'
```

## 对象转基本类型

- toString,valueOf,Symbol.toPrimitive在转换基本类型都会调用
- 优先级(从高到低)
  - Symbol.toPrimitive
  - toString
  - valueOf

```js
const a = {
  toString() {
    return 'toString'
  },
  valueOf() {
    return 'valueOf';
  },
  [Symbol.toPrimitive]() {
    return 'Symbol.toPrimitive';
  }
}

console.log(`${a}`)
```

## 一元操作符 +

1. 基础类型,直接调用Number(xxx)
2. 引用类型
   1. 调用valueOf
      1. 返回基本类型,调用Number(xxx)
      2. 走2
   2. 调用toString
      1. 返回基本类型,调用Number(xxx)
      2. 走2

```js
// Number('1') => 1
console.log(+'1') // 1

// [].toString => ''
// Number('') => 0
console.log(+[]) // 0

// ['1'].toString => '1'
// Number('1')   => 1
console.log(+['1']) // 1

// ['1','2','3'].toString() => '1,2,3'
// Number('1,2,3')  => NaN
console.log(+['1', '2', '3']) // NaN

// {}.toString() => '[obejct Obect]'
// Number('[obejct Obect]') => NaN
console.log(+{})
```

## 运算

- 其中一方是字符串类型，就会把另一个也转为字符串类型。
- 其他运算只要其中一方是数字，那么另一方就转为数字。
- 并且加法运算触发三种类型转换：将值转换为原始值，转换为数字，转换为字符串。

```js
// 1. 有一方是Number
// 2. Number(null) + 1 => 0+1 => 1
console.log(null + 1)

// String([]) + String([])
// '' + '' => ''
console.log([] + [])

// String({}) + String([])
// '[object Object]' + '' => '[object Object]'
console.log({} + [])

// String([]) + String({})
// '' + '[object Object]' => '[object Object]'
console.log([] + {})
```

## 'a'++'b'

```
'a'+(+'b')
'a'+ NaN
'aNaN'
```