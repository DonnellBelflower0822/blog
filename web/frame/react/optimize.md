# 性能优化

> React 性能优化的核心是减少渲染真实 DOM 节点的频率，减少 virtual DOM diff 的频率

## 组件卸载前进行清理操作
> 注册全局事件,定时器等需要进行清除

## 使用纯组件降低组件重新渲染的频率

- 什么是纯组件
> 相同的输入 (state、props) 呈现相同的输出. 在输入内容相同的情况下纯组件不会被重新渲染.

- 如何实现纯组件
  - 纯组件会对 props 和 state 进行浅层比较, 如果上一次的 props、state 和下一次的 props、state 相同, 则不会重新渲染组件.
  - React 提供了 PureComponent 类, 类组件在继承它以后, 类组件就变成了纯组件. 
  - 函数组件需要`React.memo(Component)`

```js
class App extend React.PureComponent {}

class App extend React.Component {
  shouldComponenUpdate(nextProps,nextState){
    return (
      !shallowDiff(this.props,nextProps) 
      || !shallowDiff(this.state,nextState)
    )
  }
}

function App(){}
const AppMemo = React.memo(App, (prevProps,nextProps)=>{
  return !shallowDiff(this.props,nextProps)
})

```

- 什么是浅层比较
  - 比较基本数据类型是否具有相同的值
  - 比较复杂数据类型的第一层值是否相同。

- 浅层比较难道没有性能消耗吗

> 和进行 dom-diff 比较操作相比，浅层比较将消耗更少的性能。diff 操作会重新遍历整颗 virtualDOM 树, 而浅层比较值操作当前组件的 state 和 props

## 高阶组件 HOC
- 什么是高阶组件 Higher Order Component ( HOC )
  - 高阶组件是 React 应用中共享代码, 增加逻辑复用的一种方式. 比如 A 组件和 B 组件都需要使用一个相同的逻辑，如何将逻辑抽取到一个公共的地方呢？答案就是使用高阶组件。
- 高阶组件的核心思想
  - 在组件的外层再包裹一层执行逻辑的组件，在外层组件中执行逻辑，再将逻辑执行的结果传递到内层组件。
- 高阶组件形式是一个函数，接收组件作为参数, 返回一个新的组件. 参数组件就是需要复用逻辑的组件，函数内部返回的新组件就是执行逻辑的组件，在新组件内部执行完逻辑以后再调用参数组件并将逻辑结果传递给参数组件。

```js
function withResizer(WrapperComponent) {
  class WithResizer extends React.Component {
    state = {
      pos: [window.innerWidth, window.innerHeight]
    }

    componentDidMount() {
      window.addEventListener('resize', ()=>{
        this.setState({
          pos: [window.innerWidth, window.innerHeight]
        })
      }))
    }
    // 处理业务逻辑,
    // 在render函数将处理好的数据传递给新组件
    render() {
      return <WrapperComponent {...this.props} {...this.state} />
    }
  }

  return WithResizer
}

function A(props) {
  return (<p>{`${props.pos}`}</p>)
}

// 使用withResize包装后的组件就具有能实时获取窗口宽度
const WithResizeA = withResizer(A)
```

## React.memo 介绍

- 与 PureComponent 相似, 如果上一次输入的 props 和下一次输入的 props 相同, 则组件不会重新渲染, 从而使组件更高效.
- PureComponent 应用于类组件, React.memo 应用于函数组件.
- React.memo 使用的也是使用浅层比较.
- 第二个参数是函数,areEqual(是否相同)
  - 返回 true；不渲染
  - 返回 false: 渲染

```js
React.memo(App, (prevProps,nextProps)=>{
  // 返回true: 不重新渲染
  // 返回false: 重新渲染
})
```

## shouldComponentUpdate

- shouldComponentUpdate 是类组件的生命周期函数, 
- 在组件 props 或者 state 发生改变后调用. 
- 返回值(组件是否更新)
  - 返回 true, 重新渲染组件, 
  - 返回 false, 阻止组件重新渲染.

```js
shouldComponentUpdate(nextProps,nextState){
  // this.props nextProps
  // this.state nextState
}
```

## 使用组件懒加载

> 使用组件懒加载可以减少 bundle 文件大小, 加快组件呈递速度.

### 路由组件懒加载

