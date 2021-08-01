import React from 'react'
import { fromJS, is } from 'immutable'

function useShouldComponentUpdate(initialValue, shouldUpdate) {
  const [, setState] = React.useState(initialValue)
  const ref = React.useRef(initialValue)

  function updateFn(newValue) {
    if (typeof newValue === 'function') {
      newValue = newValue(ref.current)
    }

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