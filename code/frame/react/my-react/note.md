- react
  - 手写react
    - oldReact
      - https://www.bilibili.com/video/BV1k341177iT?p=1&vd_source=a68f633f09d312398f97094b0716fbb8
    - react-router
      - https://www.bilibili.com/video/BV1k341177iT?p=29&vd_source=a68f633f09d312398f97094b0716fbb8
    - redux, react-redux, redux-saga, dva, umi
      - https://www.bilibili.com/video/BV1k341177iT?p=43&vd_source=a68f633f09d312398f97094b0716fbb8
    - fiber,dom-diff,hook
      - https://www.bilibili.com/video/BV16V411672B?p=2&vd_source=a68f633f09d312398f97094b0716fbb8
    - React源码阅读
      - https://xiaochen1024.com/courseware/60b1b2f6cf10a4003b634718/60b1b328cf10a4003b63471b
    - 面试题
      - https://www.bilibili.com/video/BV1H54y187W1?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8
      - https://www.bilibili.com/video/BV1AU4y187AU?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8
      - https://www.bilibili.com/video/BV1Wy4y1g7HN?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8
      - https://www.bilibili.com/video/BV1xL4y1L712?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8
- vue
  - 知识点
    - vue2
    - vue3
      - router
  - vue3
    - https://www.bilibili.com/video/BV1Q3411w7SQ?spm_id_from=333.999.0.0&vd_source=a68f633f09d312398f97094b0716fbb8
  - vue2
    - https://www.bilibili.com/video/BV1mR4y1w7cU?spm_id_from=333.999.0.0&vd_source=a68f633f09d312398f97094b0716fbb8
    - vuerouter
      - https://www.bilibili.com/video/BV115411o75m?p=2&vd_source=a68f633f09d312398f97094b0716fbb8 
    - vuex  
      - https://www.bilibili.com/video/BV1qP4y1w7NJ?spm_id_from=333.999.0.0&vd_source=a68f633f09d312398f97094b0716fbb8

- 性能优化
  - https://www.bilibili.com/video/BV1vf4y1h7rg?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8
  - https://www.bilibili.com/video/BV12h411D7iD?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8

- 微前端
  - qiankun

- 工程化
  - vite
    - https://www.bilibili.com/video/BV1LA411e7GR?p=4&vd_source=a68f633f09d312398f97094b0716fbb8
  - webpack
    - https://www.bilibili.com/video/BV1vv4y1A77K?p=67&vd_source=a68f633f09d312398f97094b0716fbb8
    - https://www.bilibili.com/video/BV1Ju41117TD?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8

- 浏览器

- 博客
- https://www.qinguanghui.com/react/%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%80%E5%B8%A7%E9%87%8C%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88.html
- https://react.iamkasong.com/#%E7%AB%A0%E8%8A%82%E8%AF%B4%E6%98%8E

# 知识点

## React是什么
> 用于构建`用户界面`的 `JavaScript` 库

## React特点
- 声明式
  - jsx
- 组件化
- 一次学习, 随处编写

## JSX
- 是一个 JavaScript 的语法扩展
- 很好地描述 UI 应该呈现出它应有交互的本质形式
  - 类型type
  - 属性props
  - 孩子children
- 打包过程会转换为
  - 旧版: React.createElement()
  - 新版
    - var _jsxRuntime = require("react/jsx-runtime");
    - (0, _jsxRuntime.jsxs)()
- 生成就是React元素

## 生命周期

- 挂载
  - constructor
  - static getDerivedStateFromProps
  - render
  - componentDidMount
- 更新
  - static getDerivedStateFromProps
  - shouldComponentUpdate
    - false
      - ...end
    - true
      - render
      - getSnapshotBeforeUpdate
      - componentDidUpdate
- 卸载
  - componentWillUnMount
- 错误
  - static getDerivedStateFromError
  - componentDidCatch

## setState

## 合成事件
- 处理兼容性问题

## key

## 组件设计原则

## React版本

- V16
  - 引入错误边界

## React性能优化

## DOM-DIFF

## React长列表

## Hook
- 在组件之间复用状态逻辑很难
  - 例如高阶组件,render props都需要改变组件结构
- 复杂组件变得难以理解
  - class组件是以生命周期拆分代码,
  - hook将相关联的部分拆分成更新函数
- 难以理解的class
  - this

## hook规则
- 只在最顶层使用 Hook
  - 不能在循环,条件, 嵌套函数中调用hook
- 只在react函数中调用hook
  - 函数组件
  - 自定义hook


## 知识点

### requestAnimateFrame

> 请求动画帧

### 一帧的执行

- 执行时长 16.6ms
- 浏览器刷新率
- 1秒刷新60次, 一帧1/60 = 16.6ms

### js睡眠

```js
const sleep = (delayMs) => {
    for (let start = Date.now(); Date.now() - start <= delayMs;) {
    }
}
```

### fiber 

- fiber是一个执行单元
- fiber是一个数据结构

### fiber执行阶段

- reconcilaition(协调render阶段):
  - DIFF
  - 找出变更
  - 可中断
- commit(提交阶段):
  - 根据reconcilaition计算出需要处理的副作用(Effects), 一次执行
  - 同步执行, 不可中断

