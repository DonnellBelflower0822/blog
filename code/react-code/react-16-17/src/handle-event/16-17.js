import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  const parentRef = React.useRef()
  const childRef = React.useRef()
  React.useEffect(() => {
    parentRef.current.addEventListener('click', () => {
      console.log('parent 原生冒泡')
    })
    parentRef.current.addEventListener('click', () => {
      console.log('parent 原生捕获')
    }, true)

    childRef.current.addEventListener('click', () => {
      console.log('child 原生冒泡')
    })
    childRef.current.addEventListener('click', () => {
      console.log('child 原生捕获')
    }, true)

    document.addEventListener('click', () => {
      console.log('document 原生冒泡')
    })
    document.addEventListener('click', () => {
      console.log('document 原生捕获')
    }, true)
  }, [])

  return (
    <div
      ref={parentRef}
      onClick={() => {
        console.log('parent react事件冒泡')
      }}
      onClickCapture={() => {
        console.log('parent react事件捕获')
      }}
    >
      <div
        ref={childRef}
        onClick={() => {
          console.log('child react事件冒泡')
        }}
        onClickCapture={() => {
          console.log('child react事件捕获')
        }}
      >child</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
