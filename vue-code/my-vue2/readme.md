# vue2

## rollup
> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

## 响应式
### 对象
- 对data进行数据劫持,如果值为对象还会继续劫持
- 对原有数据的数据进行设置新值,如果新值为对象也会继续劫持
- 设置对象的新属性不会数据劫持

### 数组
- 对数组并不是采用defineProperty进行数据劫持(主要从性能上考虑)
- 通过push,shift,pop,unshift,sort,splice,