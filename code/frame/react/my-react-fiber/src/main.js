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

function App() {
    const [state, dispatch] = TinyReact.useReducer(reducer, { count: 0 })
    return (
        <div>
            <h2>{state.count}</h2>
            <button onClick={() => {
                dispatch({ type: ADD })
            }}>+1</button>
        </div>
    )
}

TinyReactDOM.render(<App />, document.getElementById('root'))