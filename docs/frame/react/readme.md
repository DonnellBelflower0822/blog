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
