import React from 'react'
import { connect } from '../core/react-redux'
import { ADD1, ASYNC_ADD1 } from './store/action-type'

class Counter1 extends React.Component {
    render() {
        return (
            <div>
                <h2>Counter1 - {this.props.count}</h2>
                <button
                    onClick={() => {
                        this.props.dispatch({ type: ADD1 })
                    }}
                >同步+1</button>
                <button
                    onClick={() => {
                        this.props.dispatch({ type: ASYNC_ADD1 })
                    }}
                >异步+1</button>
            </div>
        )
    }
}

export default connect(state => state.count1)(Counter1)