# Typescript

- https://juejin.cn/user/764915822103079/posts

## type和interface
```ts
enum Sex {
  man,
  woman
}

interface Object1 {
  name: string;
  sex: Sex;
  [propName: string]: any;
}

const o1: Object1 = {
  name: 'allen',
  sex: Sex.man
};

type Object2 = {
  name: string,
  sex: Sex;
};

const o2: Object2 = {
  name: 'allen',
  sex: Sex.man
};
```

### 函数定义
```ts
type Fn1 = (a: string, b: string) => void;

let fn1: Fn1= (a, b) => { console.log(a + b); };

fn1('a', 'b');

interface Fn2 {
  (a: string, b: string): void;
}

let fn2: Fn2= (a, b) => { console.log(a + b); };

fn2('a', 'b');
```

### interface和type的区别

## unknown

> 不可预先定义的类型，

```ts
// 可以转换任何类型
const num: number = 10;
(num as unknown as string).split('');
(num as any as string).split('');

// unknown不能调用任何方法
const str1: unknown = 'string';
str1.split('');

// any可以调用方法
const str2: any = 'string';
str2.split('');
```

## void

> 当你对函数返回值并不在意时，使用 void 而不是 undefined

## 运算符

```ts
function click(callback?: () => void) {
  callback!();
  // callback ===null || callback===undefined ? void 0: callback()
  callback?.();
}

type Obj = {
  a: string;
  b?: number;
};

const obj: Obj = {
  a: 'allen'
};

// obj.b !==null  && obj.b!==undefined ? obj.b : 10
console.log(obj.b ?? 10);
console.log(obj.b || 10);

// obj === null || obj===undefined ? void 0 : obj.b
console.log(obj?.b);
console.log(obj!.b);

const num1: number = 1_100_200_300;
```

## keyof

```
类型 = keyof 类型
```

```ts
type Person = {
  name: string,
  age: number;
};

// name | age
type PersonKey = keyof Person;

const key: PersonKey = 'age';

function getValue(p: Person, k: keyof Person) {
  return p[k];
}

getValue({ name: 'allen', age: 10 }, 'name');
```

## typeof

```
类型 = typeof 实例
```

```ts
class Man {
  public name: string = 'allen';
  public age: number = 27;
}

const a = new Man();
type ManType = typeof a;

const allen: ManType = {
  name: 'allen',
  age: 28,
};
```

## in

```ts
type A = {
  name: string,
  age: number;
};

type ToNumber<T> = {
  [key in keyof T]: number
};

type NumberObj = ToNumber<A>;

const numberObj: NumberObj = {
  name: 1,
  age: 1
};
```

## 泛型

### Partial

```ts
type Animal = {
  name: string,
  category: string,
  age: number,
  eat: () => number;
};

type C = Partial<Animal>;

const animal: C = {
  name: 'allen'
};

type MockPartial<T> = {
  [key in keyof T]?: T[key]
};
```

### Record
### Pick

### Omit

### Exclude


### ReturnType
### Required