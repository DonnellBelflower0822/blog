import React from 'react'
import { connect } from '../core/react-redux'
import { ADD1, MINUS1 } from './store/action-type'

class Counter1 extends React.Component {
    render() {
        return (
            <div>
                <h2>Counter1 - {this.props.count}</h2>
                <button
                    onClick={() => {
                        this.props.dispatch({ type: ADD1 })
                    }}
                >+1</button>
                <button
                    onClick={() => {
                        this.props.dispatch({ type: MINUS1 })
                    }}
                >-1</button>
            </div>
        )
    }
}

export default connect(state => state.count1)(Counter1)