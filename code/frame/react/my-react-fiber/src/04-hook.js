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
    const [val, setValue] = TinyReact.useState(100)
    const instanceMember = TinyReact.useRef(10)

    const data = TinyReact.useMemo(() => state.count + 'memo', [state])

    const memoCallback = TinyReact.useCallback(() => {
        setValue(val + 1)
    }, [val])

    TinyReact.useEffect(() => {
        console.log('useEffect componentDidMount')
    }, [])

    TinyReact.useLayoutEffect(() => {
        console.log('useLayoutEffect componentDidMount')
    }, [])

    TinyReact.useLayoutEffect(() => {
        console.log('useLayoutEffect componentDidUpdate')
        return () => {
            console.log('useLayoutEffect componentDidUpdate destory')
        }
    }, [state.count])

    TinyReact.useEffect(() => {
        console.log('useEffect componentDidUpdate')
        return () => {
            console.log('useEffect componentDidUpdate destory')
        }
    }, [state.count])

    return (
        <div>
            <h2>state: {state.count}</h2>
            <button onClick={() => {
                dispatch({ type: ADD })
            }}>+1</button>
            <hr />
            <p>{data}</p>
            <h2>val: {val}</h2>
            <button onClick={() => {
                console.log(111)
                memoCallback()
            }}>+1</button>
            <button onClick={() => {
                instanceMember.current += 1
            }}>+1</button>
        </div>
    )
}

TinyReactDOM.render(<App />, document.getElementById('root'))