# React概念及面试

## 对react理解
- 是什么: 用于构建`用户界面`的 `JavaScript` 库
- 干什么: 可以通过`组件化`的方式构建快速相应的大型web应用
- 如果干:
  - `声明式`: 
    - 关注要做什么,而不是如何做
    - 表达逻辑,不是定义步骤
  - `组件化`: 
  - `一次学习,跨平台编写`
- 优点:
  - 开发团队和社区强大
  - 一次学习,跨平台
  - api简洁
- 缺点:
  - 没有官方系统解决方案,选型成本高
  - 过于灵活,不易写出高质量的应用

## JSX
- 是什么
  - 一个`js的语法`扩展,更好的描述UI应该呈现的它应有交互的`本质`形式
  - 其实是`React.createElement`或`require('react/jsx-runtime')()`的语法糖
- 实现目的
  - 声明式
  - 代码结构`清晰和简洁`,`可读性`强
  - 结构,属性,样式,事件实现`高聚合低耦合`
  - `没有引入`新的概念
- 其他方案
  - vue:template会引入其他概念: `v-on:click @click`

**jsx编译阶段的结果**
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
- 通过`React.createElement`函数返回的js对象
- 通过js对象去`描述`dom
- 优点
  - 处理浏览器`兼容性`问题,避免用户操作真实dom
  - 内容经过`xss`处理,可防止xss攻击
  - `跨平台`
  - 在更新时可以进行`差异化更新`,减少dom的更新操作
- 缺点
  - 虚拟dom需要`消耗额外的内存`
  - 首次渲染`不一定`更快

**转换过程**

```js
// 写代码阶段 
const element = <h1>hello world</h1>

// 打包编译
const element = React.createElement('h1',{}, 'hello world')

// 运行阶段
const element = {
    type: 'h1',
    props: {
        children: 'hello world'
    }
}
```

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

## hook

> 它可以让你在不编写 `class` 的情况下使用 state 以及其他的 React 特性。

### 类组件的不足
- 缺少`逻辑复⽤`机制
  - 为了复⽤逻辑增加⽆实际渲染效果的组件，增加了组件层级 显示⼗分臃肿 `HOC, render props`
  - 增加了调试的难度以及运⾏效率的降低
- 类组件经常会变得很复杂难以维护
  - 将⼀组相⼲的业务逻辑拆分到了`多个⽣命周期函数`中
  - 在⼀个⽣命周期函数内存在多个不相⼲的业务逻辑
- 类成员⽅法不能保证`this`指向的正确性

### 动机
- 在组件之间复用状态逻辑很难
  - Hook 使你在无需修改组件结构的情况下复用状态逻辑
- 复杂组件变得难以理解
  - Hook 将组件中相互关联的部分拆分成更小的函数
- 难以理解的 class
  - Hook 使你在非 class 的情况下可以使用更多的 React 特性
  - 不适用this

### 规则
- 只在最顶层使用 Hook(函数组件或自定义hook的最顶层)
  - 不要在循环，条件或嵌套函数中调用 Hook
- 只在 React 函数中调用 Hook
  - react函数组件
  - 自定义hook里调用其他hook

### 原理
- 在函数组件的fiber.alternate身上有之前的hooks存储数据
  - 如果没有,则是挂载阶段
  - 如果有, 则是更新阶段
- 每次执行函数组件挂载或更新函数组件时, 重置hookIndex索引
- 会根据索引去 初始化或获取原来的值, 执行完hook后则将索引移到下一位
- 然后给当前函数组件fiber赋值最新hooks

## 一些hook玩法

### 只有mount触发
```js
function useMount(mountFn: () => void) {
    const isMountRef = React.useRef(false)

    React.useEffect(() => {
        if (!isMountRef.current) {
            isMountRef.current = true
            mountFn()
        }
    })
}
```

### 只有更新时触发
```js
function useUpdate(updateFn: () => void) {
    const isMountRef = React.useRef(false)

    React.useEffect(() => {
        if (!isMountRef.current) {
            isMountRef.current = true
        } else {
            updateFn()
        }
    })
}
```

### 强制更新

```js
function useForceUpdate() {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  return forceUpdate
}
```

