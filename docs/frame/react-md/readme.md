# React概念

## 函数组件和类组件
- 相同点
  - 接收属性返回react元素
- 不同点
  - 编程思想:
    - 类组件: 创建实例,是面向对象的编程方法
    - 函数组件: 不需要创建实例,是基于函数式编程
  - 内存:
    - 类组件: 需要创建和保存实例,会占用一定内存
    - 函数组件: 不需要创建实例,可以节约内存
  - 捕获特性:
    - 函数组件具有值捕获特性
  - 可测试性:
    - 函数组件更方便单元测试
  - 状态:
    - 类组件和函数组件都可以有状态
  - 生命周期:
    - 类组件: 完整的生命周期
    - 函数组件: 可以通过React.useEffect实现componentDidMount,componentDidUpdate,componentWillUnmount
  - 逻辑复用
    - 类组件: 组合, 继承, hoc
    - 函数组件: 自定义hook
  - 跳过更新:
    - 类组件:
      - shouldComponentUpdate: 返回true更新,返回false不更新
      - PureComponent: 实现shouldComponent对新旧state和新旧props进行浅层比较
    - 函数组件:
      - React.memo(Component,areEqual)
      - 第二个参数`areEqual是否相等`:
        - 可以对新旧props进行比较
        - 返回true: 不更新
        - 返回false: 更新
    - 发展前景
      - 未来函数组件会成为主流
        - 屏蔽this
        - 更好的复用逻辑
 
## dom-diff

### 原则
- 只对`同级节点`进行对比,如果dom节点跨层移动,react则不会复用
- `不同类型的元素`会产生不同结构,销毁老结构,创建新结构
- 可以通过`key`标识移动元素

### 单个节点
#### type不一样

```js
<h1 key='null'>h1</h1>
// -----------------
<h2 key='null'>h1</h2>

// 执行操作
删除 h1
新增 h2
```

#### key不一样
```js
<h1 key='null'>h1</h1>
// -----------------
<h1 key='222'>h1</h1>

// 执行操作
删除 h1(key='null')
新增 h2(key='222')
```

#### type和key一样

```js
<h1 key='h1'>h1</h1>
// -----------------
<h1 key='h1'>h1-2</h1>

// 执行操作
// 复用老节点
// 查看属性有无变更,如有变化则将此fiber标记为更新属性
```

#### key相同,type不同

```js
<h1 key='h1'>h1</h1>
// -----------------
<h2 key='h1'>h2</h2>

// 执行操作
// 删除老的节点,
// 插入新节点
```

### 多个节点

1. 可能存在更新,新增,删除
2. 两轮更新
3. 第一轮处理更新,属性和类型的更新
   1. 一一比较, 比较key和type,
   2. 一旦有不同立即跳出第一轮循环
4. 第二轮处理新增,删除,移动
   1. 移动时尽量少移动,
   2. 如果必须有一个要动, 新地位高的不动, 新地位低的动

#### 更新

```js
<li key='A'>A</li>
<li key='B'>B</li>
<li key='C'>C</li>
// ---------------
<li key='A'>A-new</li>
<li key='B'>B-new</li>
<li key='C'>C-new</li>

// 执行操作
更新A
更新B
更新C
更新D
```

#### 类型

> 一一对比, key相同, type不同,删除老的,添加新的

```js
<li key='A'>A</li>
<li key='B'>B</li>
<li key='C'>C</li>
// ---------------
<div key="A">A-new</div>
<li key='B'>B-new</li>
<li key='C'>C-new</li>

// 删除老的li(A)
// 插入新的div(A)
// 更新B
// 更新C
```

### 复杂情况

```js
<li key='A'>A</li>

<li key='B'>B</li>
<li key='C'>C</li>
<li key='D'>D</li>
<li key='E'>E</li>
<li key='F'>F</li>
// ---------------
<li key='A'>A-new</li>

<li key='C'>C-new</li>
<li key='E'>E-new</li>
<li key='B'>B-new</li>
<li key='G'>G-new</li>
```

#### 执行过程
**第一轮**
- 更新A
- 遇到B和C的key不一样跳出第一轮循环

**第二轮**
- 维护一个最大的不用动节点的index. 
  - 如果在当前节点在老节点的index大于lastPlacedIndex则不需要动. 将在老节点的index赋值给lastPlacedIndex
  - 如果在当前节点在老节点的index小于lastPlacedIndex则需要动. 将在老节点的index赋值给lastPlacedIndex

```js
let lastPlacedIndex = 0
```

- 维护一个旧fiber的map: `key:Fiber`

```js
const oldFiberMap = {
  B:BFiber,
  C:CFiber,
  D:DFiber,
  E:EFiber,
  F:FFiber
}
```

**遍历新节点**

- C去oldFiberMap找
  - 有: 位置变了, 老的节点可以标记复用
  - C在老节点的index为2, 大于当前的lastPlacedIndex-0, 则不需要移动,将lastPlacedIndex修改为2
- E去oldFiberMap
  - 有: 位置变了, 老的节点可以标记复用
  - E在老节点的index为4, 大于当前的lastPlacedIndex-2, 则不需要移动,将lastPlacedIndex修改为4
- B去oldFiberMap找
  - 有: 位置变了, 老的节点可以标记复用
  - B在老节点的index为1, 大于当前的lastPlacedIndex-4, 则需要移动,
  - 移动到新节点的位置`3`
  - 将lastPlacedIndex修改为
- G去oldFiberMap找
  - 没有: 新增
- oldFiberMap中D和E没有在新节点中出现
  - 标记为删除


## 合成事件
- 使用合成事件优势
  - 浏览器兼容
  - 采用最顶层事件代理机制,能够保证冒泡一致

### React16
- 将事件委托到`document`
- 当真实dom触发事件,先处理原生事件,
- 然后冒泡到document,
- 再处理react事件: 模拟捕获->冒泡
- React事件绑定是在reconciliation阶段,会在原生事件绑定之前执行,都绑定定到document身上时 

```js
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  const parentRef = React.useRef()
  const childRef = React.useRef()
  React.useEffect(() => {
    parentRef.current.addEventListener('click', () => {
      console.log('parent 原生冒泡')
    })
    parentRef.current.addEventListener('click', () => {
      console.log('parent 原生捕获')
    }, true)

    childRef.current.addEventListener('click', () => {
      console.log('child 原生冒泡')
    })
    childRef.current.addEventListener('click', () => {
      console.log('child 原生捕获')
    }, true)

    document.addEventListener('click', () => {
      console.log('document 原生冒泡')
    })
    document.addEventListener('click', () => {
      console.log('document 原生捕获')
    }, true)
  }, [])

  return (
    <div
      ref={parentRef}
      onClick={() => {
        console.log('parent react事件冒泡')
      }}
      onClickCapture={() => {
        console.log('parent react事件捕获')
      }}
    >
      <div
        ref={childRef}
        onClick={() => {
          console.log('child react事件冒泡')
        }}
        onClickCapture={() => {
          console.log('child react事件捕获')
        }}
      >child</div>
    </div>
  )
}
```

**输出**

```js
document 原生捕获

parent 原生捕获
child 原生捕获

child 原生冒泡
parent 原生冒泡

parent react事件捕获
child react事件捕获

child react事件冒泡
parent react事件冒泡

document 原生冒泡
```

### React17

- 将事件委托到容器

```js
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  const parentRef = React.useRef()
  const childRef = React.useRef()
  React.useEffect(() => {
    parentRef.current.addEventListener('click', () => {
      console.log('parent 原生冒泡')
    })
    parentRef.current.addEventListener('click', () => {
      console.log('parent 原生捕获')
    }, true)

    childRef.current.addEventListener('click', () => {
      console.log('child 原生冒泡')
    })
    childRef.current.addEventListener('click', () => {
      console.log('child 原生捕获')
    }, true)

    document.addEventListener('click', () => {
      console.log('document 原生冒泡')
    })
    document.addEventListener('click', () => {
      console.log('document 原生捕获')
    }, true)
  }, [])

  return (
    <div
      ref={parentRef}
      onClick={() => {
        console.log('parent react事件冒泡')
      }}
      onClickCapture={() => {
        console.log('parent react事件捕获')
      }}
    >
      <div
        ref={childRef}
        onClick={() => {
          console.log('child react事件冒泡')
        }}
        onClickCapture={() => {
          console.log('child react事件捕获')
        }}
      >child</div>
    </div>
  )
}
```

**输出**

```
document 原生捕获

parent react事件捕获
child react事件捕获

parent 原生捕获
child 原生捕获

child 原生冒泡
parent 原生冒泡

child react事件冒泡
parent react事件冒泡

document 原生冒泡
```

### 模拟实现

```js
const paths = [];
while (target) {
  paths.push(target);
  target = target.parentNode;
}

// 模拟捕获
for (let i = paths.length - 1; i > 0; i -= 1) {
  const dom = paths[i];
  const { store } = dom;
  const eventName = `${eventType}Capture`;
  if (store?.[eventName]) {
    // 原生事件的this为undefined
    const listener = store[eventName];
    listener(syntheticEvent);
  }
}

// 模拟冒泡
for (let i = 0; i < paths.length - 1; i += 1) {
  const dom = paths[i];
  const { store } = dom;
  if (store?.[eventType]) {
    const listener = store[eventType];
    listener(syntheticEvent);
  }
}
```

### 场景

**react17中**

```js
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    document.addEventListener('click', () => {
      setVisible(false)
    })
  }, [])

  // 此处的是绑定到root容器身上,所以stopPropagation可以阻止向上冒泡, 所以document的click事件绑定不会执行
  function show(e) {
    e.stopPropagation();
    setVisible(true)
  }

  return (
    <div>
      <button onClick={show}>显示</button>
      {visible && <div
        onClick={(e) => {
          e.stopPropagation()
        }}
      >模态框</div>}
    </div>
  )
}
```

#### React16

- 在react16中事件绑定到document身上
- e是合成事件
- e.nativeEvent: 原事件,
- e.stopPropagation: 是阻止向上冒泡,但没法阻止当前元素剩余click事件绑定的执行
- e.nativeEvent.stopImmediatePropagation: 阻止向上冒泡啊, 并且阻止当前元素剩余click事件绑定的执行

```js
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    document.addEventListener('click', () => {
      setVisible(false)
    })
  }, [])

  function show(e) {
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setVisible(true)
  }

  return (
    <div>
      <button onClick={show}>显示</button>
      {visible && <div
        onClick={(e) => {
          e.stopPropagation()
        }}
      >模态框</div>}
    </div>
  )
}
```

## 单向数据流
- 在React中, 关于数据流动有一条原则, 就是单向数据流动, 自顶向下, 从父组件到子组件.
- 单向数据流特性要求我们共享数据要放置在上层组件中.
- 子组件通过调用父组件传递过来的方法更改数据.
- 当数据发生更改时, React会重新渲染组件树.
- 单向数据流使组件之间的数据流动变得`可预测`. 使得定位程序错误变得简单.

## 生命周期
<img src='./img/lifecycle.jpg' />

## 受控组件与⾮受控组件
- ⾮受控组件
  - 表单数据交由DOM节点管理. 特点是表单数据在需要时进⾏获取. 代码实现相对简单.
- 受控组件
  - 表单数据交由state对象管理. 特点是可以实时得到表单数据. 代码相对复杂.

## props和state
- props和state是普通的 JS 对象。虽然它们都包含影响渲染输出的信息，
- 但是它们在组件方面的功能是不同的。
  - state 是组件自己管理数据，控制自己的状态，可变；
  - props 是外部传入的数据参数，不可变；
- 没有state的叫做无状态组件，
- 有state的叫做有状态组件；
- 多用 props，少用 state，也就是多写无状态组件。

## StrictMode
- React 的StrictMode是一种辅助组件，可以帮助咱们编写更好的 react 组件，可以使用<StrictMode />包装一组组件，并且可以帮咱们以下检查：
  - 验证内部组件是否遵循某些推荐做法，如果没有，会在控制台给出警告。
  - 验证是否使用的已经废弃的方法，如果有，会在控制台给出警告。
  - 通过识别潜在的风险预防一些副作用。

## 什么是 prop drilling，如何避免？
- 在构建 React 应用程序时，在多层嵌套组件来使用另一个嵌套组件提供的数据。最简单的方法是将一个 prop 从每个组件一层层的传递下去，从源组件传递到深层嵌套组件，这叫做prop drilling。
- prop drilling的主要缺点是原本不需要数据的组件变得不必要地复杂，并且难以维护。
- 为了避免prop drilling，
  - 一种常用的方法是使用React Context。通过定义提供数据的Provider组件，并允许嵌套的组件通过Consumer组件或useContext Hook 使用上下文数据。
  - redux

## 高阶组件

- 代码复用，逻辑抽象，抽离底层准备（bootstrap）代码
- 渲染劫持
- State 抽象和更改
- Props 更改


