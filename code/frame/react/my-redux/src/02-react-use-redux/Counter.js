import React from 'react'
import { createStore } from '../core/redux/createStore'

const ADD = 'ADD'
const MINUS = 'MINUS'

const reducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return { ...state, count: state.count + 1 }
        case MINUS:
            return { ...state, count: state.count - 1 }
        default:
            return state
    }
}

const store = createStore(reducer, { count: 0 })

class Counter extends React.Component {
    constructor (props) {
        super(props)
        this.state = { count: 0 }
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                count: store.getState().count
            })
        })
    }
    componentWillUnmount() {
        this.unsubscribe?.()
    }
    render() {
        return (
            <div>
                <h2>{this.state.count}</h2>
                <button
                    onClick={() => {
                        store.dispatch({ type: ADD })
                    }}
                >+1</button>
                <button
                    onClick={() => {
                        store.dispatch({ type: MINUS })
                    }}
                >-1</button>
            </div>
        )
    }
}

export default Counter