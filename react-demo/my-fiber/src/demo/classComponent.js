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