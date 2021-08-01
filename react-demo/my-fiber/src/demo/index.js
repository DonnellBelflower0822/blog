import React, { Component, render } from '../react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'allen'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.props.title} App {this.state.name}</h1>
        <button
          onClick={() => {
            this.setState({
              name: 'tom'
            })
          }}
        >按钮</button>
      </div>
    )
  }
}

render(<App title='react' />, root)

// function App1(props) {
//   return (
//     <div>{props.title} App</div>
//   )
// }

// render(<App1 title='hello'/>, root)

// -----------------------
// ------- update  -------
// -----------------------

// const jsx1 = (
//   <div>
//     <p>hello react</p>
//     <button>按钮</button>
//   </div>
// )
// render(jsx1, root)

// setTimeout(() => {
//   const jsx2 = (
//     <div>
//       <div>jsx react</div>
//     </div>
//   )
//   render(jsx2, root)
// }, 3000);



