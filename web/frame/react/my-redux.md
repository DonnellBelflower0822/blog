# react-redux

## redux

> js状态容器,提供可预测化的状态管理

## 组成
<img src='./img/redux.png'/>

## 基础用法
```js
import { createStore } from 'redux'

const initalState = { count: 0 }
// 创建reducer.在这里进行state的初始化
function rootReducer(state = initalState, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 }
    case 'DESC':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// 创建store
const store = createStore(rootReducer)

// 获取state
console.log(store.getState())

// 订阅:store更新
store.subscribe(() => {
  document.getElementById('count').innerHTML = store.getState().count
})

// 触发action
const addAction = { type: 'ADD' }
const addBtn = document.getElementById('add')
addBtn.onclick = () => {
  // 派发dispatch
  store.dispatch(addAction)
}
const descBtn = document.getElementById('desc')
const descAction = { type: 'DESC' }
descBtn.onclick = () => {
  // 派发dispatch
  store.dispatch(descAction)
}
```

## 在react中使用redux的原因

- 在React中组件通信的数据流是单向的, 
- 顶层组件可以通过props属性向下层组件传递数据, 
- ⽽下层组件不能向上层组件传递数据, 要实现下层组件修改数据, 需要上层组件传递修改数据的⽅法到下层组件. 
- 当项⽬越来越⼤的时候, `组件之间传递数据变得越来越困难`.

**使用**

- 使⽤Redux管理数据，由于Store独⽴于组件，使得数据管理独⽴于组件，解决了组件与组件之间传递数据困难的问题。

## redux基础用法
```js
const initalState = { count: 0 }
// 创建reducer
// 在这里进行state的初始化
// redux默认会一开始派发@@INIT初始化
function rootReducer(state = initalState, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 }
    case 'DESC':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// 创建store
const store = Redux.createStore(rootReducer)

// 派发动作
store.dispatch({type:'ADD'})

// 订阅:store更新
store.subscribe(() => {
  // do some thing
})

// 获取state
store.getState()
```

## react-redux

- 在react中比较方便使用redux.不用考虑订阅更新
- Provider提供store
- connect连接

```js
// 在根组件外面使用Provider提供store
import { Provider } from 'react-redux'
<Provider store={store}>
  <App />
</Provider>

// 在组件使用端
import { connect } from 'react-redux'

// 从store的state获取数据到props,传递给组件
const mapStateToProps = ({ counter }) => ({
  count: counter.count
})

// 将dispatch方法封装一下传递给组件,方便组件调用
const mapDispatchToProps = dispatch => ({
  add(payload) {
    dispatch({ type: 'add', payload })
  },
  desc(payload) {
    dispatch({ type: 'desc', payload })
  }
})
const mapDispatchToProps = dispatch => (
  bindActionCreators(counterActions, dispatch)
)

// 使用connect高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

## store

> 在react使用还是简单,主要是store怎么维护好

### index.js
```js
import rootReducer from './reducer'
export default createStore(rootReducer)
```

### actions-type.js
> 维护全局action-type常量. 放在同一个文件可以保证不重复

### actions: 生成action对象

格式: `const actionName = (payload)=>({type:actionType,payload})`

### middleware: 中间件

### reducer:  

#### 拆分reducer

> 每个维护自己的初始值,针对action走不同操作

```js
const initalState = { }
export default function reducer(state = initalState, action) {
  // hanlde action
  return state
}
```

#### 聚合reducer形成rootReducer

新的数据结构`state = {counter:{count:0},modal:{visible}}`

```js
import { combineReducers } from 'redux'
import counterReducer from './counter'
import modalReducer from './modal'

export default combineReducers({
  counter: counterReducer,
  modal: modalReducer,
})
```

## 手写redux

```js
// 创建store
export function createStore(reducer, preloadState, enhancer) {
  // 预判断
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be a function')
  }
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer must be a function')
    }

    // 如果有enhancer函数,传递createStore和reducer, preloadState
    return enhancer(createStore)(reducer, preloadState)
  }

  // store.state
  let state = preloadState

  // 获取state
  function getState() {
    return state
  }

  // 订阅数组
  const callbacks = []

  // 派发
  function dispatch(action) {
    if (
      action === null
      || typeof action !== 'object'
      || Array.isArray(action)
    ) {
      throw new Error('action must be a object')
    }

    if (action.type === undefined) {
      throw new Error('action must be has type field')
    }

    // 使用reducer函数,传递当前state和派发的动作
    // 返回新的state
    state = reducer(state, action)

    // 通知所有订阅执行
    callbacks.forEach(cb => cb())
  }

  // 订阅
  function subscribe(callback) {
    callbacks.push(callback)
    // 返回一个取消订阅的方法
    return () => {
      const index = callbacks.indexOf(callback)
      callbacks.splice(index, 1)
    }
  }

  // 默认派发一个初始化动作
  dispatch({ type: '@@@INIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}
```

### bindActionCreators

**使用**
```js
const add = (payload) => ({ type: 'ADD', payload })
const desc = (payload) => ({ type: 'DESC', payload })

const actions = bindActionCreators({
  add,
  desc
}, store.dispatch)

// 使用是就不用在使用dispatch
actions.add
// 等价于
function (payload){
  store.dispatch(add(payload))
}
```

**实现**

```js
export function bindActionCreators(actionCreators, dispatch) {
  const boundActions = {}
  Object.keys(actionCreators).forEach(key => {
    boundActions[key] = (payload) => {
      dispatch(actionCreators[key](payload))
    }
  })
  return boundActions
}
```

### combineReducers

- 将多个小的reducer集合成一个reducer
- 根的reducer同样也是一个函数,接收state和action
- 返回的state数据结构 `{counter:{count:0},modal:{visible:false}}`

```js
export function combineReducers(reducers) {
  const reducersKey = Object.keys(reducers)

  return (state, action) => {
    const nextState = {}
    reducersKey.forEach(key => {
      nextState[key] = reducers[key](state[key], action)
    })

    return nextState
  }
}
```

### echancer

> 增强dispatch使其支持处理action为函数的情况

```js
// createStore第三个参数echancer是一个函数,可以增强store,主要是增强dispatch
const store = createStore(rootReducer, undefined, echancer)

function echancer(createStore) {
  return (reducer, preloadState) => {
    // 这里逻辑是跟store一致
    const store = createStore(reducer, preloadState)
    const { dispatch } = store
    
    // 对dispatch进行增强
    const _dispatch = (action) => {
      if (typeof action === 'function') {
        return action(dispatch)
      }
      dispatch(action)
    }
    
    return {
      ...store,
      dispatch: _dispatch
    }
  }
}
```

### 使用applyMiddleware

> 把上面echancer的简化一下,提供一个应用中间件的方法

```js
export default createStore(
  rootReducer,
  applyMiddleware(logger,thunk)
)
```

#### 自定义中间件的格式

```js
// 这个store是阉割版 {dispatch,getState}
export default function logger(store) {
  // next: 下一个中间件,最后一个的next就是dispatch
  return function (next){
    // 动作
    return function (action) => {
      // do some thing

      // 调用next执行下一个中间件
      // 最后一个的next执行dispatch
      next(action)
    } 
  }
}
```

### 实现applyMiddleware

```js
export const applyMiddleware = (...middlewares) => {
  return (createStore) => {
    return (reducer, preloadState) => {
      const store = createStore(reducer, preloadState)
      const middlewareApi = {
        getState: store.store,
        dispatch: store.dispatch
      }

      // 先执行中间件的第一层, 先让中间件缓存store
      // [
      //  (next) => (action) => {}
      //  (next) => (action) => {}
      // ]
      const chains = middlewares.map(middleware => middleware(middlewareApi))
      const _dispatch = compose(...chains)(store.dispatch)

      return { ...store, dispatch: _dispatch }
    }
  }
}

// 举例: applyMiddleware(logger, thunk)
// const chain = middlewares.map(middleware => middleware(middlewareApi))
// chain = [
//    logger: (next) => (action) => {}, 
//    thunk: (next) => (action) => {}
// ]
// compose(已经执行过第一层的中间件)(真正的dispatch)
// const _dispatch = compose(...chain)(store.dispatch)
/**
logger: (next ==> thunk) => (action) => {}
thunk: (next ==> store.dispatch) => (action) => {}
 */
function compose(...chains) {
  return (dispatch) => {
    for (let i = chains.length - 1;i >= 0;i--) {
      dispatch = chains[i](dispatch)
    }

    return dispatch
  }

  return dispatch => {
    return chains.reduceRight((next, chain) => {
      return chain(next)
    }, dispatch)
  }
}
```

## redux-thunk

> 解决dispatch的action不能为函数的情况

```js
import thunk from 'redux-thunk'
export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export const add_sync = (payload) => {
  return function (dispatch){
    setTimeout(() => {
      dispatch(add(playload))
    }, 1000);
  }
}
```

### 实现: 中间件

```js
export default store => next => action => {
  // 只要是action是函数就调用action并传递dispatch
  if (typeof action === 'function') {
    // 如果是函数,会将next传递给函数
    // 调用next去执行下一个中间件或者是store.dispatch
    return action(next)
  }

  next(action)
}

```


