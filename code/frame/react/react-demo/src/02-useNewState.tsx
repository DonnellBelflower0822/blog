import React, { Dispatch, Ref, RefObject, SetStateAction } from "react"

function App() {
    const [state, setState] = React.useState(0)

    const handleClick = () => {
        setState(state + 1)
        setTimeout(() => {
            console.log(state)  // 0
        }, 1000)
    }

    return (
        <div>
            APP
            <button onClick={handleClick}>点击</button>
        </div>
    )
}

function useNewState<T = any>(initialState: any): [RefObject<T>, Dispatch<SetStateAction<T>>] {
    const [state, setState] = React.useState(initialState)
    const stateRef = React.useRef(initialState)

    React.useEffect(() => {
        stateRef.current = state
    })

    return [stateRef, setState]
}

function NewApp() {
    const [state, setState] = useNewState<number>(0)

    const handleClick = () => {
        setState(state.current! + 1)
        setTimeout(() => {
            console.log(state.current)  // 0
        }, 1000)
    }

    return (
        <div>
            <hr />
            new APP
            <button onClick={handleClick}>点击</button>
        </div>
    )
}

export default () => (
    <div>
        <App />
        <NewApp />
    </div>
)