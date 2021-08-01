import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    document.addEventListener('click', () => {
      setVisible(false)
    })
  }, [])

  function show(e) {
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setVisible(true)
  }

  return (
    <div>
      <button onClick={show}>显示</button>
      {visible && <div
        onClick={(e) => {
          e.stopPropagation()
        }}
      >模态框</div>}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
