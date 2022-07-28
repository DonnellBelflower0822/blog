import React from "react"

function useMount(mountFn: () => void) {
    const isMountRef = React.useRef(false)

    React.useEffect(() => {
        if (!isMountRef.current) {
            isMountRef.current = true
            mountFn()
        }
    })
}
function useUpdate(updateFn: () => void) {
    const isMountRef = React.useRef(false)

    React.useEffect(() => {
        if (!isMountRef.current) {
            isMountRef.current = true
        } else {
            updateFn()
        }
    })
}

function App() {
    const [state, setState] = React.useState(0)

    const handleClick = () => {
        setState(state + 1)
    }

    useMount(() => {
        console.log('only mount')
    })
    useUpdate(() => {
        console.log('only update')
    })

    return (
        <div>
            {state}
            <button onClick={handleClick}>+1</button>
        </div>
    )
}

export default () => (
    <div>
        <App />
    </div>
)