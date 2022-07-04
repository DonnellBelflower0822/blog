import React, { render } from '../react'

const jsx1 = (
  <div>
    <p>hello react</p>
    <button>按钮</button>
  </div>
)
render(jsx1, root)

setTimeout(() => {
  const jsx2 = (
    <div>
      <div>jsx react</div>
    </div>
  )
  render(jsx2, root)
}, 3000);



