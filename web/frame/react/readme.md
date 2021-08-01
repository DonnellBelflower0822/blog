# React概念

## 对react理解
- 是什么: 用于构建用户界面的 JavaScript 库
- 干什么: 可以通过组件化的方式构建快速相应的大型web应用
- 如果干:
  - 声明式: 
  - 组件化: 
  - 一次学习,跨平台编写
- 优点:
  - 开发团队和社区强大
  - 一次学习,跨平台
  - api简洁
- 缺点:
  - 没有官方系统解决方案,选型成本高
  - 过于灵活,不易写出高质量的应用

## JSX
- 是什么
  - 一个js的语法扩展,更好的描述UI应该呈现的它应有交互的本质形式
  - 其实是React.createElement的语法糖
- 实现目的
  - 声明式
  - 代码结构清晰和简洁,可读性强
  - 结构,属性,样式,事件实现高聚合低耦合
  - 没有引入新的概念
- 其他方案
  - vue:template会引入其他概念: `v-on:click @click`

**转换后**
```js
const element = <h1>hello world</h1>

// 在react runtime为 classic
const element = /*#__PURE__*/React.createElement("h1", null, "Hello, world!");

// react runtime 为 automaic
import { jsx as _jsx } from "react/jsx-runtime";
const element = /*#__PURE__*/_jsx("h1", {
  children: "Hello, world!"
});
```

## 虚拟dom
- 通过React.createElement函数返回的js对象
- 通过js对象去描述dom
- 优点
  - 处理浏览器兼容性问题,避免用户操作真实dom
  - 内容经过xss处理,可防止xss攻击
  - 跨平台
  - 在更新时可以进行差异化更新,减少dom的更新操作
- 缺点
  - 虚拟dom需要消耗额外的内存
  - 首次渲染不一定更快

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

## React渲染流程
- jsx
- React.createElement(经过babel)
- virtual dom
 
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
- react16
  - 将事件委托到document
  - 当真实dom触发事件,先处理原生事件,然后冒泡到document,再处理react事件
  - React事件绑定是在reconciliation阶段,会在原生事件绑定之前执行,都绑定定到document身上时 
- react17
  - 将事件委托到容器
- 使用合成事件优势
  - 浏览器兼容
  - 采用最顶层事件代理机制,能够保证冒泡一致

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


