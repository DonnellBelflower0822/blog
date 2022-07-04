import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.PureComponent {
  state = {
    count: 0
  }

  add0 = () => {
    // time1  {count: 0}
    // time2  {count: 0}
    // callback1  {count: 1}
    // callback2  {count: 1}

    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log('callback1 ', this.state)
    })
    console.log('time1 ', this.state)

    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log('callback2 ', this.state)
    })
    console.log('time2 ', this.state)
  }

  add1 = () => {
    // time1  {count: 0}
    // time2  {count: 0}
    // callback1  {count: 2}
    // callback2  {count: 2}
    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {
      console.log('callback1 ', this.state)
    })
    console.log('time1 ', this.state)

    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {
      console.log('callback2 ', this.state)
    })
    console.log('time2 ', this.state)
  }

  add2 = () => {
    // callback1  {count: 1}
    // time1  {count: 1}
    // callback2  {count: 2}
    // time2  {count: 2}
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      }, () => {
        console.log('callback1 ', this.state)
      })
      console.log('time1 ', this.state)

      this.setState({
        count: this.state.count + 1
      }, () => {
        console.log('callback2 ', this.state)
      })
      console.log('time2 ', this.state)
    })
  }

  add3 = () => {
    setTimeout(() => {
      // time1  {count: 0}
      // time2  {count: 0}
      // callback1  {count: 1}
      // callback2  {count: 1}
      ReactDOM.unstable_batchedUpdates(() => {
        this.setState({
          count: this.state.count + 1
        }, () => {
          console.log('callback1 ', this.state)
        })
        console.log('time1 ', this.state)

        this.setState({
          count: this.state.count + 1
        }, () => {
          console.log('callback2 ', this.state)
        })
        console.log('time2 ', this.state)
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.add0}>batch +1</button>
        <button onClick={this.add1}>callback +1</button>
        <button onClick={this.add2}>setTimeout +1</button>
        <button onClick={this.add3}>setTimeout batchUpdate +1</button>
        <button onClick={this.add4}>setTimeout batchUpdate +1</button>
      </div>
    )
  }
}

// legacy 同步模式
ReactDOM.render(<Counter />, document.getElementById('root'))

// ReactDOM.createRoot(document.getElementById('root')).render(<Counter />)
