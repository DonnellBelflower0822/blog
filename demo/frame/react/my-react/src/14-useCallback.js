import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function Child2() {
    const [count2, setCount2] = TinyReact.useState(2)

    return (
        <div>
            <button onClick={() => {
                setCount2(count2 + 1)
            }}>Child2 +1</button>
            <div>{count2}</div>
        </div>
    )
}

function ParentComponent() {
    const [count1, setCount1] = TinyReact.useState(0)

    const callback = TinyReact.useCallback(() => {
        setCount1((prevCount) => prevCount + 2)
    }, [])
    const callback1 = TinyReact.useCallback(() => {
        setCount1(count1 + 1)
    }, [count1])

    return (
        <div>
            <section>
                <button
                    onClick={callback1}
                >
                    count1 +1
                </button>
                <button
                    onClick={callback}
                >
                    count1 +2
                </button>
                <p>{count1}</p>
                <Child2 />
            </section>
        </div>
    )
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
