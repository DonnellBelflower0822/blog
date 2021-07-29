import React from 'react'

function withResizer(WrapperComponent) {
  class WithResizer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        pos: [window.innerWidth, window.innerHeight]
      }
    }

    setSize = () => {
      this.setState({
        pos: [window.innerWidth, window.innerHeight]
      })
    }

    componentDidMount() {
      window.addEventListener('resize', this.setSize)
    }

    render() {
      return <WrapperComponent {...this.props} {...this.state} />
    }
  }

  return WithResizer
}

function A(props) {
  return (
    <div>
      <h1>A</h1>
      <p>{`${props.pos}`}</p>
    </div>
  )
}
const WithResizeA = withResizer(A)
function B(props) {
  return (
    <div>
      <h1>B</h1>
      <p>{`${props.pos}`}</p>
    </div>
  )
}
const WithResizeB = withResizer(B)

export default function App() {
  return (
    <div>
      <WithResizeA />
      <WithResizeB />
    </div>
  )
}