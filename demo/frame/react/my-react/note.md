- react
  - 手写react
    - https://www.bilibili.com/video/BV1k341177iT?p=1&vd_source=a68f633f09d312398f97094b0716fbb8
      - p7
    - 面试题
      - https://www.bilibili.com/video/BV1a54y1b7XH?spm_id_from=333.337.search-card.all.click&vd_source=a68f633f09d312398f97094b0716fbb8
- vue
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


## 知识点

### React是什么
> 用于构建`用户界面`的 `JavaScript` 库

### React特点
- 声明式
  - jsx
- 组件化
- 一次学习, 随处编写

### JSX
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

### 生命周期

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

### setState

### 合成事件
- 处理兼容性问题

### key

### 组件设计原则

### React版本

- V16
  - 引入错误边界

### React性能优化

### DOM-DIFF

### React长列表

### Hook
- 在组件之间复用状态逻辑很难
  - 例如高阶组件,render props都需要改变组件结构
- 复杂组件变得难以理解
  - class组件是以生命周期拆分代码,
  - hook将相关联的部分拆分成更新函数
- 难以理解的class
  - this

### hook规则
- 只在最顶层使用 Hook
  - 不能在循环,条件, 嵌套函数中调用hook
- 只在react函数中调用hook
  - 函数组件
  - 自定义hook


