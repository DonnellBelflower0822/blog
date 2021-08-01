# 数据不可变

## 不可变
- Redux 要求全局状态具有可不变性。
- React 要求本地组件状态具有不可变性。

## 数据突变

- 在 JavaScript 中，对象属于引用数据类型，将一个对象赋值给另一个对象时，实际上是将对象的引用地址赋值给了另一个对象，此时两个变量同时指向了内存中的同一个对象，通过两个变量对对象进行的任何操作，都会影响另一方，这就是数据突变。
- 由于数据突变带来的`不可预测`，JavaScript 中的这项特性非常容易导致改 A 坏 B 的问题。
- 可以把数据突变想象为 "保存"，它会在原有数据上进行修改。
- 数组突变的方法: `sort、splice、push、pop`

```js
const p1 = { name: 'allen' }
const p2 = p1

p2.name = 'tom'
console.log(p1.name)

const arr1 = [1, 3, 2]
const arr2 = arr1.sort()
console.log(arr1) // [ 1, 2, 3 ]
console.log(arr2) // [ 1, 2, 3 ]
```

## 数据的不可变

- 对引用类型的数据进行更改，更改并不会作用于原数据，而是返回一个更改后的全新的数据。
- 可以把数据的不可变想象为 "另存为"，它会返回全新的更改后的数据。
- 由于数据的不可变，使数据的操作更加安全，更加可预测。
- 数据不可不可变: `map、filter、reduce、slice`

```js
const before = ["a", "b", "c", "d"]
const after = before.slice(0, 2)
console.log(after) // ["a", "b"]
console.log(before) // ["a", "b", "c", "d"]
```

## Immutable

### 防止数据突变

Immutable 意为不可变数据，每次操作都会产生一个新的不可变数据，无论这个操作是增加，删除还是修改，都不会影响到原有的不可变数据。不可变数据可以防止数据突变带来的不可预测性。

### 提升数据操作性能

不可变数据中采用了数据结构共享，返回的新的不可变数据中，发生变化的数据是独立的, 其他没有发生变化的数据是共享的，数据结构共享解决了深拷贝带来的性能问题。

```js
import { Map } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = map1.set('a', '2')
console.log(map1 === map2)  // false
console.log(map1.get('b') === map2.get('b'))  // true
```

## 基础用法
> 真正输出的结构不是对象或数组,只是简化

```js
// 修改
import { Map, List, setIn, getIn } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = map1.set('a', '2')
const map3 = setIn(map2, ['b', 'c'], 3)
console.log(map1) // {a: 1, b: { c: 2 }}
console.log(map2) // {a:2, b:{c:2}}
console.log(map3) // {a:2, b:{c:3}}

console.log(getIn(map3, ['b', 'c']))  // 3

const list1 = new List(['a', 'b', 'c'])
const list2 = setIn(list1, [0], { name: 'allen' })
console.log(list1) // ['a', 'b', 'c']
console.log(list2) // [{name: "allen"}, 'b', 'c']

const list3 = setIn(list2, [0, 'name'], 'jack')
console.log(list3)  // [{name: "jack"}, 'b', 'c']

console.log(getIn(list3, [0, 'name']))  // jack

// 合并
import { Map, List, merge } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = Map({ a: 3, d: 4, e: 5 })
console.log(merge(map1, map2))  // {a:3,b:{c:2},d:4,e:5}

const list1 = new List(['a', 'b', 'c'])
const list2 = new List(['a', 'd', 'e'])
console.log(merge(list1, list2))  //  ["a", "b", "c", "a", "d", "e"]

// 删除 + 更新
import { Map, List, removeIn, updateIn } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = removeIn(map1, ['b'])
console.log(map2) // {a:1}

// 第三个参数为更新函数
const map3 = updateIn(map1, ['b', 'c'], target => `hello-${target}`)
console.log(map3) // {a:1,b:{c:'hello-2'}}

const list1 = new List(['a', 'b', 'c'])
const list2 = removeIn(list1, [0])
console.log(list2)  //  [undefined "b", "c"]

const list3 = updateIn(list1, [0], target => target + 'jack')
console.log(list3)  // ["ajack", "b", "c"]
```

### fromJS

```js
import { List, Map, getIn, fromJS } from 'immutable'

// Map 和 List 方法在创建数据时不支持深层嵌套，fromJS 方法支持深层嵌套。
const map1 = Map({ a: 1, b: { c: 2 } })
console.log(getIn(map1, ['b'])) // {c: 2}

const map2 = fromJS({ a: 1, b: { c: 2 }, d: [1, 2, 3] })
console.log(getIn(map2, ['b'])) // Map {c: 2}
console.log(getIn(map2, ['d'])) // List [1,2,3]

const list1 = List([1, { name: 'allen' }])
console.log(getIn(list1, [1]))  // {name:'allen'}

const list2 = fromJS([1, { name: 'allen' }])
console.log(getIn(list2, [1]))  // Map {name:'allen'}
```

### is

```js
import { fromJS, is } from 'immutable'

const map1 = fromJS({ a: 1, b: { c: 2 }, d: [1, 2, 3] })
const map2 = fromJS({ a: 1, b: { c: 2 }, d: [1, 2, 3] })

console.log(is(map1, map2)) // true
```

## react+immutable

- 性能优化
  - PureComponent提供了浅层比较,如果是数据结构包含复杂类型时,依然存在无效的diff
  - immutable提供数据共享特性,能够快速进行差异比较,
- 防止状态突变
  - 例如下面点击按钮后,只改person的name,不会影响person.age

```js
import { fromJS, get, set, is } from 'immutable';
import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: fromJS({
        name: 'allen',
        age: 27
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 能够快速找到差异
    return !is(this.state.person, nextState.person)
  }

  render() {
    return (
      <div>
        <h1>{get(this.state.person, 'name')}</h1>
        <h2>{get(this.state.person, 'age')}</h2>
        <button
          onClick={() => {
            this.setState({
              // 只改person的name,不会影响person.age
              // 防止状态突变
              person: set(this.state.person, 'name', 'jack')
            })

            // 类比下面的状态修改,person的状态突变成只包含name,不包含age
            this.setState({
              person:{
                name:'jack'
              }
            })
          }}
        >改名</button>
      </div>
    )
  }
}
```



## hook函数组件实现shouldComponentUpdate

- 函数组件react提供React.memo比较prevProps和newProps
- 实现支持比较两次状态的hook

```js
import React from 'react'
import { fromJS, is } from 'immutable'

function useShouldComponentUpdate(initialValue, shouldUpdate) {
  // 目的只是为了刷新
  const [, setState] = React.useState(initialValue)
  // 保存最新的值
  const ref = React.useRef(initialValue)

  // 更新方法
  function updateFn(newValue) {
    // 支持函数和对象两种方式
    if (typeof newValue === 'function') {
      // 函数会将当前最新的状态作为参数传给函数
      newValue = newValue(ref.current)
    }

    // 调用shouldUpdate传入上一次状态和最新状态
    // 返回true则刷新调用setState刷新组件
    // 返回false则让ref记录最新状态即可
    if (shouldUpdate(ref.current, newValue)) {
      // 只有调用useState的第二个参数才刷新
      setState(newValue)
    }

    // 改变ref.current不会刷新
    ref.current = newValue
  }

  return [ref.current, updateFn]
}

export default function App() {
  const [count, setCount] = useShouldComponentUpdate(0,
    (prevCount, newCount) => prevCount !== newCount
  )
  const [man, setMan] = useShouldComponentUpdate(
    fromJS({ name: 'allen' }),
    (prevMan, newMan) => !is(prevMan, newMan)
  )

  console.log('render')
  return (
    <div>
      <p>{man.get('name')}</p>
      <button onClick={() => { setMan(man.set('name', 'allen')) }}>
        按钮-allen
      </button>
      <button onClick={() => { setMan(man.set('name', 'jack')) }}>
        按钮-jack
      </button>
      <p>{count}</p>
      <button onClick={() => { setCount(1) }}>
        改变计数
      </button>
    </div>
  )
}
```

## redux与immutable结合

> 主要在reducer里面可以针对要改的进行修改

```js
import { createStore } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { fromJS } from 'immutable'

function Page() {
  const man = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <>
      <div>{man.name}</div>
      <div>{man.age}</div>
      <div>{man.get('name')}</div>
      <div>{man.get('age')}</div>
      <button onClick={() => { dispatch({ type: "ADD" }) }}>+1</button>
      <button onClick={() => { dispatch({ type: "DESC" }) }}>-1</button>
    </>
  )
}

// const initailState = { name: 'allen', age: 27 }
// const reducer = (state = initailState, action) => {
//   switch (action.type) {
//     case "ADD":
//       return {
//         ...state,
//         age: state.age + 1
//       }
//     case "DESC":
//       return {
//         ...state,
//         age: state.age - 1
//       }
//     default:
//       return state
//   }
// }

const initailState = fromJS({ name: 'allen', age: 27 })
const reducer = (state = initailState, action) => {
  const age = state.get('age')
  switch (action.type) {
    case "ADD":
      return state.set('age', age + 1)
    case "DESC":
      return state.set('age', age - 1)
    default:
      return state
  }
}

const store = createStore(reducer)

export default function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  )
}
```


