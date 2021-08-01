import { fromJS, get, set, is } from 'immutable';
import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: fromJS({
        name: 'allen',
        age: 27
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 能够快速找到差异
    return !is(this.state.person, nextState.person)
  }

  render() {
    return (
      <div>
        <h1>{get(this.state.person, 'name')}</h1>
        <h2>{get(this.state.person, 'age')}</h2>
        <button
          onClick={() => {
            this.setState({
              // 只改person的name,不会影响person.age
              // 防止状态突变
              person: set(this.state.person, 'name', 'jack')
            })
          }}
        >改名</button>
      </div>
    )
  }
}