# Typescript

## 类型

### any
- 任何类型都可以被归为 any 类型
- TypeScript 允许我们对 any 类型的值执行任何操作，而无需事先执行任何形式的检查

```ts
const str: any = 'hello any'

str.say()

const str1: string = str
```

### Unknown

- 所有类型也都可以赋值给 unknown
- unknown 类型只能被赋值给 any 类型和 unknown 类型本身

```ts
const un1: unknown = 'heloo'

// error Object is of type 'unknown'.ts(2571)
// un1.say()

// error Type 'unknown' is not assignable to type 'string'.ts(2322)
// const un2: string = un1

const un3: any = un1
const un4: unknown = un1
```

### Void
- 表示没有任何类型

```ts
function fn1(): void {
    console.log('hello void')
}
```

### never
- 那些永不存在的值的类型
  -  总是会抛出异常
  -  根本就不会有返回值的函数表达式
  -  箭头函数表达式的返回值类型

```ts
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) { }
}
```

## type和interface

### 相同点

#### 声明对象或函数

```ts
interface Fn1 {
    (str: number): string
}
type Fn2 = (str: number) => string

interface Obj1 {
    age: number
}
type Obj2 = {
    age: number
}
```

#### 扩展
```ts
type Extend1 = { name: string }
type Extend2 = Extend1 & { age: number }

interface Extend3 { name: string }
interface Extend4 extends Extend3 { age: number }

// type 扩展 interface
type Extend5 = Extend1 & Extend3
// interface 扩展 type
interface Extend6 extends Extend1 { }

```
### 不同

#### 只能用type声明 `基本类型, 联合类型, 元祖类型` 的别名
```ts
// 基本类型, 联合类型, 元祖类型
type Base = number
type Union = number | string
type Tu = [number, string]
```

#### 同名interface可合并, type不能存在同名

```ts
interface A { name: string }
interface A { age: number }
const a: A = { name: '', age: 1 }
```

## 断言
### <>语法
```ts
const an1: any = 'hello'
const num1: number = (<string>an1).length
console.log(num1)
```

### as语法

```ts
const an2: any = 'hello'
const num2: number = (an1 as string).length
console.log(num2)
```
### !

```ts
let an3: string | undefined | null
// 忽略  undefined 和 null
console.log(an3!.length)
// 报错  undefined 和 null没有length属性
// console.log(an3.length)
```

## 守卫
### in
```ts
interface Admin {
    name: string
    isAdmin: boolean
    loginTime: number
}

interface Guest {
    name: string,
    limit: boolean,
    time: number
}

type UnknownType = Admin | Guest

function test(type: UnknownType) {
    if ('isAdmin' in type) {
        // type = Admin
        console.log(type.loginTime)
    }
    if ('limit' in type) {
        // type = Guest
        console.log(type.time)
    }
}
```

### typeof
```ts
function getUnit(value: string | number) {
    if (typeof value === 'string') {
        return value.slice(value.length - 2)
    }
    if (typeof value === 'number') {
        return 'px'
    }
    throw new Error('expected string or number, got ' + typeof value)
}
getUnit(1)
getUnit('10px')

```

### instanceof
```ts
class Class1 {
    getName() { }
}
class Class2 {
    getAge() { }
}

function doSomeThing1(instance: Class1 | Class2) {
    if (instance instanceof Class1) {
        instance.getName()
        return
    }

    if (instance instanceof Class2) {
        instance.getAge()
        return
    }
    throw new Error('expected Class1 or Class2, got unknown')
}

const c1 = new Class1()
doSomeThing1(c1)
```

## 联合

```ts
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);
```

## 前置

### typeof
- 获取一个变量声明或对象的类型。
- `typeof 属性/函数/实例 = 类型`

```ts
/**
 * typeof
 */
interface Person {
    name: string,
    age: number
}

const allen: Person = { name: 'allen', age: 27 }

type T1 = typeof allen

const t1: T1 = {
    name: 'tim',
    age: 14
}

function fn1(man: typeof allen) {
    return man.name
}

// type T2 = (man: typeof allen) => string
type T2 = typeof fn1
```

### keyof
- 获取某种类型的所有键，其返回类型是联合类型。
- keyof 类型 = key的联合类型

```ts
interface Person1 {
    name: string,
    age: number
}

// name | age
type K1 = keyof Person1
const k1: K1 = 'name'

// string | number
type K2 = keyof { [x: string]: Person1 }

```

### in
- 遍历枚举类型：

```ts
type K3 = 'a' | 'b' | 'c'
// { a: string, b: string, c: string}
type K4 = {
    [x in K3]: string
}

const k4: K4 = {
    a: '',
    b: '',
    c: ''
}
```

### infer

### extends
- 有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

```ts
interface In16 {
    length: number
}

function fn<T extends In16>(arg: T): T {
    return arg
}
// Argument of type 'number' is not assignable to parameter of type 'In16'
// fn(1)

fn({ length: 1 })
```

## 手撕泛型

### Partial

> 把属性都改成非必填

```ts
interface T0 {
    name: string,
    age: number
}

type T1 = Partial<T0>

// 真正转换后
type T1 = {
  name?: string,
  age?: number
}
```

**实现**
```ts
type MyPartial<T> = {
  [K in keyof T]?: T[K]
}
```


### Record



```ts
type Man = 'allen' | 'tim'
type Info = { name: string, age: number }

type Mans = Record<Man, Info>

type Mans = {
  allen: {name:string,age:number},
  tim: {name:string,age:number}
}
const mans: Mans = {
    allen: { name: 'allen', age: 2 },
    tim: { name: '', age: 2 }
}
```

**实现**

```ts
type MyRecord<K extends keyof any, V> = {
  [P in K]: V
}
```

### Pick

> 提取

```ts
interface T0 {
    name: string,
    age: number,
    sex: string
}

type T1 = Pick<T0, 'name' | 'age'>
const t1: T1 = { name: 'tim', age: 12 }
```

**实现**

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
### Extract 提取

```ts
interface Person {
    name: string;
    // a:1
}

interface NewPerson {
    name: string;
    age: number;
    id: number;
}

type T2 =  Extract<NewPerson, Person> 

//  NewPerson如果extends继承Person(继承了Person的属性)，就返回NewPerson，否则就never异常
const obj1: T2 = {
    name: '',
    age: 1,
    id: 1
}
```

**实现**

```ts
type MyExtract<T,U> = T extends U ? T : never
```

### Exclude(排除/不包括) 
> 返回联合类型

```ts
interface T0 {
    name: string,
    age: number,
    sex: string,
    top: number
}
// sex top
type T1 = Exclude<keyof T0, 'name' | 'age'>
const t1: T1 = 'sex'
const t2: T1 = 'top'
```

**实现**

```ts
type MyExclude<T, U> = T extends U ? T : never
```

### ReturnType
- `ReturnType<T>` 的作用是用于获取函数 T 的返回类型。

```ts
// string
type T0 = ReturnType<() => string>;
```

**实现**

```ts
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
```

### Required

```ts
interface T0 {
    name?: string,
    age?: number
}

type T1 = Required<T0>
const t1: T1 = {
    name: 'allen',
    age: 23
}
```

**实现**
```ts
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}
```

### Readonly
```ts
interface T0 {
    name?: string,
    age?: number
}

type T1 = Readonly<T0>
const t1: T1 = {
    name: 'allen'
}

// Cannot assign to 'name' because it is a read-only property.(2540)
t1.name = 'jack'
```

**实现**

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### Omit
```ts
interface T0 {
  name: string,
  age: number,
  sex: string
}

// type T1 = {
//     sex: string;
// }
type T1 = Omit<T0, 'name' | 'age'>
const t1: T1 = { sex: 'man' }
```

**实现**

```ts
type MyOmit<T, U extends keyof T> = {
  [P in Exclude<keyof T, U>]: T[P]
}

type MyOmit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>
```
