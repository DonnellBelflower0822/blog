# Webpack

## 概念

webpack 是一个用于现代 `JavaScript` 应用程序的 `静态模块打包`工具

- 默认只对`js和json`进行处理，其他类型需要借助loader
- 打包：它会在内部构建一个 `依赖图(dependency graph)`，此依赖图对应映射到项目所需的每个模块，并生成`一个或多个 bundle`

## loader 加载器
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

### 常用loader
- babel-loader: 转换js
  - 优化
    - 'babel-loader?cacheDirectory'
    - 排除 node_modules
    - 优化辅助代码 `plugins: ['@babel/plugin-transform-runtime']`
- postcss-loader
  - 使用 JS 插件转换样式
  - 补全css和处理css兼容性
- css-loader
- style-loader
- less-loader
- MiniCssExtractPlugin.loader
- asset/resource 处理资源
- ts-loader
- vue-loader

## plugin 插件
  - 插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

### 常见plugins
- html-webpack-plugin: 简化了 HTML 文件的创建
- SplitChunksPlugin: 拆分chunks
- EnvironmentPlugin: 环境变量 process.env.xxx
- CopyWebpackPlugin: 复制文件
- MiniCssExtractPlugin: 将css文件独立成文件
- EslintWebpackPlugin: 
- VueLoaderPlugin: vue
- webpack-bundle-analyzer: 打包文件分析

## Loader和Plugin的区别
- Loader 本质就是一个函数，在该函数中对接收到的`内容`进行转换，返回转换后的结果。
- Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的`生命周期`中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
- 配置位置
  - Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。
  - Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。
- 执行顺序
  - Loader: 从右到左
  - Plugin: 从左到右

## 使用

### 预加载preload/预获取prefetch

- preload(预加载)：当前导航下可能需要资源
- prefetch(预获取)：将来某些导航下可能需要的资源

#### 区别
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
- 配置
  - preload: `import(/* webpackPreload: true */ './path/to/js')`
  - prefetch: `import(/* webpackPrefetch: true */ './path/to/js')`

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


## 优化手段

### hash

> filename: [name].[contenthash][ext]

- hash ：任何一个文件改动，整个项目的构建 hash 值都会改变；
- chunkhash：文件的改动只会影响其所在 chunk 的 hash 值；
- contenthash：每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值

### 优化构建速度

- resolve.extensions: 高频文件后缀名放前面；
- externals: 从输出的 bundle 中排除依赖
- module.rule 缩小范围
- babel-loader
  - 开启缓存 babel-loader?cacheDirectory
  - 缓存位置： node_modules/.cache/babel-loader
- 合理利用alias

### 优化构建结果

- webpack-bundle-analyzer分析打包结果
- css-minimizer-webpack-plugin压缩css文件
- terser-webpack-plugin 压缩js

### 优化运行时
- 入口点分割
- splitChunks拆分chunks
- 代码懒加载

## 题
### source map是什么？生产环境怎么用？
- source map 是将编译、打包、压缩后的代码映射回`源代码`的过程。
- 打包压缩后的代码不具备良好的`可读性`，想要调试源码就需要 soucre map。
- map文件只要不打开开发者工具，浏览器是不会加载的。
- 线上环境一般有三种处理方案：
  - hidden-source-map：借助第三方错误监控平台 Sentry 使用
  - nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高
  - sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)
- 注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积大小，并降低整体性能


### 使用webpack开发时，你用过哪些可以提高效率的插件？
- webpack-merge: 合并webpack配置
- webpack-devServer: 热更新
- webpack-bundle-analyzer-plugin: 分析打包后的结果

### 模块打包原理知道吗？
Webpack 实际上为每个模块创造了一个可以`导出和导入`的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。

### 文件监听原理呢？

- 在发现源码发生变化时，自动重新构建出新的输出文件。

### 说一下 Webpack 的热更新原理吧

- Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到`不用刷新浏览器`而将新变更的模块`替换`掉旧的模块。

- HMR的核心就是客户端从服务端拉去`更新后`的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，
- 当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

