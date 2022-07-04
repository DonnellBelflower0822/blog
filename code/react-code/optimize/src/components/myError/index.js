import React from 'react'
class App extends React.PureComponent {
  static displayName = 'AA'
  handler() {
    // console.log(this.setState)
  }
  render() {
    throw new Error('hello')
    return <h1 onClick={this.handler}>App</h1>
  }
}

class MyError extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (<div>发生错误</div>)
    }

    return <App />
  }
}

export default MyError