# 执行上下文

## 资料
- https://muyiy.cn/blog/1/1.1.html#%E6%89%A7%E8%A1%8C%E6%A0%88

## 概念

- `执行上下文`是当前 JavaScript 代码被解析和执行时所在环境的抽象概念。
- 执行上下文分类
  - 全局执行上下文: 只有一个
  - 函数执行上下文: 存在`无数`个，只有在函数`被调用`的时候才会被创建一个新的执行上下文
  - Eval 函数执行上下文: 指的是运行在 eval 函数中的代码
- 执行栈
  - 也叫调用栈，具有 `LIFO（后进先出）`结构，用于存储在代码执行期间创建的所有执行上下文。
- 执行上下文
  - 创建阶段
    - 确定this
    - LexicalEnvironment（词法环境）: 存储`函数`声明, `let/const`声明
      - 环境记录
      - 对外部环境的引用
    - VariableEnvironment（变量环境）: 存储`var`声明
      - 环境记录
      - 对外部环境的引用
    - 作用域链
  - 执行阶段
- 执行上下文核心三件套
  - 变量对象（VO）
  - 作用域链（Scope）
  - this

## 执行上下文伪代码

```ts
enum EnvironmentRecordType {
    '全局环境' = 'Object',
    '函数环境' = 'EnvironmentRecord'
}

type ParentFunctionEnvironmentReference = Record<string, unknown>

// 全局执行上下文: 只有一个
interface GlobalExectionContext {
    // 确定this
    ThisBinding: Window
    // 词法环境: 存储变量和函数声明的实际位置
    LexicalEnvironment: {
        // 环境记录
        EnvironmentRecord: Window & {
            // 环境记录标识: 全局环境和函数环境
            type: EnvironmentRecordType.全局环境,
            // 在es6储存函数声明和let,const声明的变量
            funcName: () => void
            letName: unknown
            constName: unknown,
        } & {
            // 自定义全局变量
            customName: unknown
        }
        // 对外部环境的引用: 以访问其外部词法环境
        // 全局环境 -> null
        outer: null
    }
    // 变量环境
    VariableEnvironment: {
        // 环境记录
        EnvironmentRecord: Window & {
            // 环境记录标识: 全局环境和函数环境
            type: EnvironmentRecordType.全局环境,
            // 在es6储存var声明的变量
            varName: unknown
        } & {
            // 自定义全局变量
            customName: unknown
        }
        // 对外部环境的引用
        // 全局环境 -> null
        outer: null
    },
}

// 函数执行上下文: 可以存在多个
interface FunctionExectionContext {
    // 确定this: 取决于函数的调用方式
    ThisBinding: any
    // 词法环境: 存储变量和函数声明的实际位置
    LexicalEnvironment: {
        // 环境记录
        EnvironmentRecord: {
            // 环境记录标识: 全局环境和函数环境
            type: EnvironmentRecordType.函数环境
            // 函数参数
            Arguments: ArrayLike<unknown>,
            // 在es6储存函数声明和let,const声明的变量
            funcName: () => void
            letName: unknown
            constName: unknown
        }
        // 对外部环境的引用: 以访问其外部词法环境
        // 函数环境 -> 全局/父级环境
        outer: Window | ParentFunctionEnvironmentReference
    }
    // 变量环境
    VariableEnvironment: {
        // 环境记录
        EnvironmentRecord: {
            // 环境记录标识: 函数环境
            type: EnvironmentRecordType.函数环境
            // 函数参数
            Arguments: ArrayLike<unknown>,
            // 函数内用var声明的变量
            varName: unknown
        }
        // 对外部环境的引用
        // 函数环境 -> 全局/父级环境
        outer: Window | ParentFunctionEnvironmentReference
    },
}

// 执行上下文
type ExectionContext = GlobalExectionContext | FunctionExectionContext

class ECStack {
    // 执行上下文栈: 先进后出的数据结构
    exectionContextStack: ExectionContext[] = []
    // 先进后出的数据结构
    push(exectionContext: ExectionContext) {
        this.exectionContextStack.push(exectionContext)
    }
    pop() {
        this.exectionContextStack.pop()
    }
}
```

## 伪代码模拟执行栈
```ts
// 执行栈
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f();
}
checkscope();

const ecStack = new ECStack()
ecStack.push(globalContext)
ecStack.push(checkscope <functionContext>)
ecStack.push(f <functionContext>)
ecStack.pop()
ecStack.pop()
```

```ts
var scope1 = "global scope";
function checkscope1(){
    var scope1 = "local scope";
    function f(){
        return scope1;
    }
    return f;
}
checkscope1()();

const ecStack1 = new ECStack()
ecStack1.push(checkscope1 <functionContext>)
ecStack1.pop()
ecStack1.push(f <functionContext>)
ecStack1.pop()
```

## 变量对象

> 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

### 分类

- 全局上下文的变量对象 (VO)
- 函数上下文的变量对象（AO）也成称为活动对象
  - 只有到当`进入`一个执行上下文中，这个执行上下文的变量对象才会被激活
  - 只有`被激活`的变量对象，也就是活动对象上的各种属性才能被访问

### 进入执行上下文
- 函数的所有形参 ：没有实参，属性值设为undefined。
- 函数声明：如果变量对象已经存在相同名称的属性，则完全替换这个属性。(同名优先级高)
- 变量声明：如果变量名称跟已经声明的形参或函数相同，则变量声明不会干扰已经存在的这类属性。

```js
function foo(a) {
    var b = 2;
    function c() { }
    var d = function () { };

    b = 3;
}

foo(1);

// 执行foo函数内部前
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c() { },
    d: undefined
}

// 执行foo函数内部后
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 2,
    c: reference to function c() { },
    d: reference to function () { };
}
```