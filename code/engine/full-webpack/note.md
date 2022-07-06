# 知识点

## 预加载preload/预获取prefetch

- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

### 区别
- 加载时机
    - preload chunk 会在父 chunk 加载时，以并行方式同时开始加载。
    - prefetch chunk 会在父 chunk 加载结束后才开始加载。
- 优先级
    - preload chunk 具有中等优先级，并立即下载。
    - prefetch chunk 在浏览器闲置时下载。
- 使用时机
    - preload chunk 会在父 chunk 中立即请求，用于当下时刻。
    - prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

## 概念
### 入口
### 输出
### loader 加载器
  - 作用
    - webpack 只能理解 JavaScript 和 JSON 文件
    - loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。
  - 特点
    - loader 支持`链式`调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照`相反`的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
    - loader 可以是`同步`的，也可以是`异步`的。
    - loader 运行在 Node.js 中，并且能够执行任何操作。
    - loader 可以通过 `options` 对象配置
    - 除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块。
    - 插件(plugin)可以为 loader 带来更多特性。
    - loader 能够产生额外的任意文件。
### plugin 插件
  - 插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
### mode

- optimization.chunkIds
  - development: named
  - production: deterministic
  - chunkIds的值
    - 'natural'	按使用顺序的数字 id。
    - 'named'	对调试更友好的可读的 id。
    - 'deterministic'	在不同的编译中不变的短数字 id。有益于长期缓存。在生产模式中会默认开启。
    - 'size'	专注于让初始下载包大小更小的数字 id。
    - 'total-size'	专注于让总下载包大小更小的数字 id。

### 分割文件

webpack 将根据以下条件自动拆分 chunks：

- 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30


## 知识点
- 优化手段
- 概念篇
- 原理篇
- 手写篇
