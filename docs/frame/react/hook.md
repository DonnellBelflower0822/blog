# Hook

> 它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 类组件的不足
- 缺少逻辑复⽤机制
  - 为了复⽤逻辑增加⽆实际渲染效果的组件，增加了组件层级 显示⼗分臃肿
  - 增加了调试的难度以及运⾏效率的降低
- 类组件经常会变得很复杂难以维护
  - 将⼀组相⼲的业务逻辑拆分到了多个⽣命周期函数中
  - 在⼀个⽣命周期函数内存在多个不相⼲的业务逻辑
- 类成员⽅法不能保证this指向的正确性

## 动机
- 在组件之间复用状态逻辑很难
  - Hook 使你在无需修改组件结构的情况下复用状态逻辑
- 复杂组件变得难以理解
  - Hook 将组件中相互关联的部分拆分成更小的函数
- 难以理解的 class
  - Hook 使你在非 class 的情况下可以使用更多的 React 特性
  - 不适用this

## 规则
- 只在最顶层使用 Hook
  - 不要在循环，条件或嵌套函数中调用 Hook
- 只在 React 函数中调用 Hook
  - react函数组件
  - 自定义hook里调用其他hook

## 原理
- 维护为一个`hookState`的数组
- 维护一个`hookIndex`索引,
- 会根据索引去 初始化或获取原来的值

## useReducer

- useReducer是另⼀种让函数组件保存状态的⽅式

```ts
type ReducerAction = {
  type: string;
  [x: string]: unknown;
};

type ReaducerActionSetState<T> = (state: T) => T;
type Reducer<T> = (state: T, action: ReducerAction | ReaducerActionSetState<T>) => T | null;

export function useReducer<T>(reducer: Reducer<T>, initalState: T) {
  hookState[hookIndex] = hookState[hookIndex] || (typeof initalState === 'function' ? initalState() : initalState);

  const currentIndex = hookIndex;
  function dispatch(action: ReducerAction) {
    let nextState;
    const lastState = hookState[currentIndex];

    if (reducer) {
      // 处理传递reducer的情况
      nextState = reducer(
        lastState,
        action
      );
    } else {
      // 处理reducer为null的情况
      nextState = typeof action === 'function' ? (action as ReaducerActionSetState<T>)(lastState) : action;
    }

    hookState[currentIndex] = nextState;

    // 更新组件
    fullUpdate();
  }

  return [
    hookState[hookIndex++],
    dispatch
  ];
}
```

### 使用

```js
import React from 'react'

const ADD = 'ADD'
const DESC = 'DESC'
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + (action.payload || 1) }
    case DESC:
      return { number: state.number - 1 }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, { number: 1 })

  return (
    <div >
      <div>{state.number}</div>
      <button onClick={() => {
        dispatch({
          type: ADD,
          payload: 2
        })
      }}>+2</button>
      <button onClick={() => {
        dispatch({
          type: DESC
        })
      }}>-1</button>
    </div>
  )
}
```

## React.useState()

- ⽤于为函数组件引⼊状态
- 设置状态值⽅法的⽅法本身是异步的

**使用**
```jsx
import React from 'react'
export default function App() {
  const [number, setNumber] = React.useState(0)

  return (
    <div>
      <p>{number}</p>
      <button onClick={() => {
        setNumber(number + 1)
      }}>按钮</button>
    </div>
  )
}
```

**实现**

```ts
export function useState(initalState) {
  return useReducer(null, initalState);
}
```

## React.useMemo()

> 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
> 缓存值。类似vue的computed

**使用**

```js
const data = React.useMemo(() => ({ number }), [number])
```

**实现**

```ts
// hookIndex++ 主要在进入下一个hook函数能获取正确的索引
// 如果没有传deps。每次都会走重新计算的流程
export function useMemo<T>(factory: () => T, deps?: unknown[]): T {
  // 初始化
  if (!hookState[hookIndex]) {
    const newMemo = factory();
    hookState[hookIndex++] = [newMemo, deps];
    return newMemo;
  }

  const [lastMemo, lastDeps] = hookState[hookIndex];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  if (same) {
    // 如果依赖项一样，直接返回缓存的值
    hookIndex += 1;
    return lastMemo;
  }

  // 不同则重新计算
  const memoValue = factory();
  hookState[hookIndex++] = [memoValue, deps];
  return memoValue;
}
```

## React.useCallback

> 性能优化, 缓存函数, 使组件重新渲染时得到相同的函数实例.

```js
const handleClick = CustomReact.useCallback(() => {
  // ...do some thing
}, [number])
```

**实现**

```ts
export function useCallback(callback: () => void, deps?: unknown[]) {
  // 初始化
  if (!hookState[hookIndex]) {
    hookState[hookIndex++] = [callback, deps];
    return callback;
  }

  // 判断依赖项是否一样
  const [lastCallback, lastDeps] = hookState[hookIndex];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  if (same) {
    // 一样则返回缓存的callback
    hookIndex += 1;
    return lastCallback;
  }

  // 重新缓存新的callback
  hookState[hookIndex++] = [callback, deps];
  return callback;
}
```

## React.useContext

- 在跨组件层级获取数据时简化获取数据的代码

```js
const context = React.useContext(CounterContext)
```

**实现**

```ts
// 跟React.createContext的实现原理对应
export function useContext(Context: { Provider: { _value: unknown; }; }) {
  return Context.Provider._value;
}
```

## React.useEffect

- 让函数型组件拥有处理副作⽤的能⼒. 类似⽣命周期函数.
- useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

```js
function App() {
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    console.log('use Effect')
    const timer = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  return <div>{count}</div>
}
```

### 结合异步函数
```js
// useEffect的第一个参数不能是异步函数
useEffect(()=>{
  (async ()=>{
    await fetch()
  })()
})
```

### 模拟componentDidMount

```js
React.useEffect(() => {
  // componentDidMount
},[])
```

### 模拟componentDidUpdate

```js
React.useEffect(() => {
  // componentDidUpdate
})
```

### 模拟componentWillUnmount
```js
React.useEffect(() => {
  return ()=>{
    // componentWillUnmount
  }
},[])
```

### 实现

```js
// 使用宏任务。浏览器ui渲染后才执行
type DestyoryFn = () => void;
export function useEffect(cb: () => DestyoryFn, deps?: unknown[]) {
  const currentHook = hookIndex;
  if (!hookState[currentHook]) {
    // 初始化
    // 在宏任务中执行
    setTimeout(() => {
      // 先执行一次
      const destoryFunction = cb();
      hookState[currentHook] = [destoryFunction, deps];
    });
    hookIndex += 1;
    return;
  }

  const [destoryFunction, lastDeps] = hookState[currentHook];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  //  如果依赖项一样，则不需要执行effect
  if (same) {
    hookIndex++;
    return;
  }

  // 调用销毁函数
  destoryFunction?.();
  // 重新执行
  setTimeout(() => {
    const destoryFunction = cb();
    hookState[currentHook] = [destoryFunction, deps];
  });
  hookIndex += 1;
}
```

## React.useLayoutEffect

**使用**

```js
function App() {
  const ref = React.useRef(null)
  
  // 会有动画效果
  // 因为useEffect是在宏任务才执行。也就是说浏览器ui渲染`之后`才执行
  React.useEffect(() => {
    ref.current.style.transform = 'translate(500px)'
    ref.current.style.transition = '500ms'
  }, [])

  // 不会有动画效果
  // 因为useLayoutEffect是在微任务才执行。也就是说浏览器ui渲染`之前`才执行
  React.useLayoutEffect(() => {
    ref.current.style.transform = 'translate(500px)'
    ref.current.style.transition = '500ms'
  }, [])

  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  }
  return (
    <div style={style} ref={ref}></div>
  )
}
```

**实现**

> 跟useEffect的区别就是queueMicrotask

```ts
// 微任务。在浏览器ui渲染之前执行: queueMicrotask
export function useLayoutEffect(cb: () => DestyoryFn, deps: unknown[]) {
  const currentHookIndex = hookIndex;
  // 初始化
  if (!hookState[currentHookIndex]) {
    queueMicrotask(() => {
      const destoryFunction = cb();
      hookState[currentHookIndex] = [destoryFunction, deps];
    });
    hookIndex += 1;
    return;
  }

  const [destoryFunction, lastDeps] = hookState[currentHookIndex];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  if (same) {
    hookIndex++;
    return;
  }

  // 重新执行。先调用销毁函数。在微任务重新执行
  destoryFunction?.();
  queueMicrotask(() => {
    const destoryFunction = cb();
    hookState[currentHookIndex] = [destoryFunction, deps];
  });
  hookIndex += 1;
}
```

## React.forwardRef

> 像外部组件想获取函数组件的ref
> 但是有安全性问题。给到父组件的ref完全暴露。

```js
import React from 'react'

function Sub(props, ref) {
  return <input ref={ref} />
}

const ForwardedSub = React.forwardRef(Sub)

export default function App() {
  const childRef = React.useRef()

  return (
    <div>
      <ForwardedSub ref={childRef} />
      <button onClick={() => {
        childRef.current.focus()
        // 直接可以干掉子级
        // childRef.current.remove()
      }}>获得焦点</button>
    </div>
  )
}
```

**实现**

```ts
import { Component } from 'React';

export function forwardRef(FunctionComponent) {
  return class extends Component {
    render() {
      if (FunctionComponent.length < 2) {
        // 提示
      }
      return FunctionComponent(this.props, this.ref);
    }
  };
}

// 在类组件
if (reactNode.ref) {
  reactNode.ref.current = instance;
  instance.ref = reactNode.ref;
}
```

## React.useImperativeHandle

```js
import React from 'react'

// ref会作为函数组件第二个参数
function Sub(props, ref) {
  const inputRef = React.useRef()
  
  React.useImperativeHandle(ref, () => ({
    // 返回选择暴露给调用组件的方法/属性
    focus() {
      inputRef.current.focus()
    }
  }))

  return <input ref={inputRef} />
}

const ForwardedSub = React.forwardRef(Sub)

export default function App() {
  const childRef = React.useRef()

  return (
    <div>
      <ForwardedSub ref={childRef} />
      <button onClick={() => {
        childRef.current.focus()
        // 报错
        childRef.current.remove()
      }}>获得焦点</button>
    </div>
  )
}
```

**实现**

```ts
// useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
export function useImperativeHandle(ref, factoy) {
  ref.current = factoy();
}
```

## React.useRef

- 获取DOM元素对象
- 保存数据 (跨组件周期)
  - 即使组件重新渲染, 保存的数据仍然还在. 保存的数据被更改不会触发组件重新渲染

**使用**

```js
const childRef = React.useRef()
```

**实现**

```ts
export function useRef(initialState?: unknown) {
  hookState[hookIndex] = hookState[hookIndex] || { current: initialState };
  return hookState[hookIndex++];
}
```

## 自定义hook
- ⾃定义 Hook 是标准的封装和共享逻辑的⽅式.
- ⾃定义 Hook 是⼀个函数, 其名称以 use 开头.
- ⾃定义 Hook 其实就是逻辑和内置 Hook 的组合.

## hook获取不到最新的值

- 函数组件其实是一个闭包。每个函数执行都是新的
- 获取不到最新的值。只能获取当时闭包的值

```js
import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)

  function handler() {
    for (let i = 0;i < 3;i += 1) {
      setTimeout(() => {
        // 由于函数组件都是一个闭包。
        // 获取不到最新的值，只能获取到“当时”的值
        console.log(count)  // 0
        setCount(count + 1)
      }, 3000);
    }
  }

  // 页面最后显示的是1
  return (
    <div>
      <p>{count}</p>
      <button onClick={handler}>+</button>
    </div>
  )
}
```

## 使用React.useRef保存最新的值

- 使用React.useRef多次获取都是同一个
- 使用React.createRef每次都是新的

```js
import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)
  const countRef = React.useRef()

  React.useEffect(() => {
    countRef.current = count
  })

  function handler() {
    setCount(count + 1)
    setTimeout(() => {
      console.log(count)  // 0
      console.log(countRef.current)  // 永远是最新值
    }, 3000)
  }

  // 页面最后显示的是1
  return (
    <div>
      <p>{count}</p>
      <button onClick={handler}>+</button>
    </div>
  )
}
```

## hook进行数据获取

```js
import React from 'react'
export default function Request() {
  React.useEffect(() => {
    // todo some request
    console.log(1)
  }, [])
  return (
    <div>aaaaa</div>
  )
}
```

## 类似类实例属性
```js
import React from 'react'

export default function App() {
  const intervalRef = React.useRef()
  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      // do some thing
    }, 100);
    return () => {
      clearInterval(intervalRef.current)
    }
  })

  function stop() {
    // 类似实例的属性
    clearInterval(intervalRef.current)
  }

  return (
    <div onClick={stop}>Hello</div>
  )
}
```

## 只有在更新时执行

```js
import React from 'react'

// 只有在更新时执行
function useUpdateEffect(updateFn) {
  const flagRef = React.useRef()

  React.useEffect(() => {
    if (!flagRef.current) {
      flagRef.current = true
    } else {
      updateFn()
    }
  })
}

export default function Request() {
  const [state, setState] = React.useState(0)
  useUpdateEffect(() => {
    console.log('update')
  })

  return (
    <div onClick={() => { setState(state + 1) }}>{state}</div>
  )
}
```

## 获取上一次的值
```js
import React from 'react'

function usePrevious(count) {
  const prevCountRef = React.useRef();
  React.useEffect(() => {
    prevCountRef.current = count
    debugger
  })
  return prevCountRef.current
}

export default function Request() {
  const [state, setState] = React.useState(0)
  const previousState = usePrevious(state)

  return (
    <div onClick={() => {
      console.log('上一次state', previousState)
      console.log('当前state', state)
      setState(state + 1)
    }}>{state}</div>
  )
}
```

## 强制更新
```js
import React from 'react'

function useForceUpdate() {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  return forceUpdate
}

export default function Request() {
  const forceUpdate = useForceUpdate()
  console.log('更新')
  return (
    <div onClick={forceUpdate}>11</div>
  )
}
```





