import React from 'react'
import dva, { connect } from './dva'
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();

const app = dva({
    // history
})

app.model({
    namespace: 'counter',
    state: {
        count: 0
    },
    reducers: {
        add(state) {
            return { ...state, count: state.count + 1 }
        }
    },
    effects: {
        *asyncAdd(action, { call, put }) {
            yield call(delay, 1000)
            // yield put({ type: 'counter/add' })
            yield put({ type: 'add' })
        }
    }
})
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const Counter = (props) => {
    return (
        <div>
            <h2>{props.count}</h2>
            <button onClick={() => {
                props.dispatch({ type: 'counter/add' })
            }}>同步+1</button>
            <button onClick={() => {
                props.dispatch({ type: 'counter/asyncAdd' })
            }}>异步+1</button>
        </div>
    )
}

const ConnectedCounter = connect(state => state.counter)(Counter)

app.router(() => <ConnectedCounter />)
// app.router(() => <Counter  />)

app.start('#root')