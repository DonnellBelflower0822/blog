import React, { render } from '../react'

function App(props) {
  return (
    <div>
      <h1>{props.title} App</h1>
      <button>按钮</button>
    </div>
  )
}

render(<App title='react' />, root)