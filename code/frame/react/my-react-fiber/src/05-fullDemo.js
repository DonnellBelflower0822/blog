import TinyReact from "./TinyReact/react";
import TinyReactDOM from "./TinyReact/react-dom";

const ADD = 'ADD'

function reducer(state, action) {
    switch (action.type) {
        case ADD:
            return { count: state.count + 1 }
        default:
            return state
    }
}

class Child1 extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { name: 'allen' }
    }
    render() {
        return (
            <div>
                <h2>Child1</h2>
                <p>11</p>
            </div>
        )
    }
}

function App() {
    const [state, dispatch] = TinyReact.useReducer(reducer, { count: 0 })
    return (
        <div>
            <h2>{state.count}</h2>
            <button onClick={() => {
                dispatch({ type: ADD })
            }}>+1</button>
            <Child1 />
        </div>
    )
}

TinyReactDOM.render(<App />, document.getElementById('root'))