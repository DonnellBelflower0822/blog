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

## 单向数据流
- 在React中, 关于数据流动有一条原则, 就是单向数据流动, 自顶向下, 从父组件到子组件.
- 单向数据流特性要求我们共享数据要放置在上层组件中.
- 子组件通过调用父组件传递过来的方法更改数据.
- 当数据发生更改时, React会重新渲染组件树.
- 单向数据流使组件之间的数据流动变得`可预测`. 使得定位程序错误变得简单.

## 生命周期
<img src='./img/lifecycle.jpg' />



