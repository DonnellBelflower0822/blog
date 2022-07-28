import React, { Dispatch, Ref, RefObject, SetStateAction } from "react"

function App() {
    const timerRef = React.useRef<number>()

    React.useEffect(() => {
        timerRef.current = setInterval(() => {
            console.log('do')
        }, 1000)
    }, [])

    const handleClick = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>清除定时器</button>
        </div>
    )
}

export default () => (
    <div>
        <App />
    </div>
)