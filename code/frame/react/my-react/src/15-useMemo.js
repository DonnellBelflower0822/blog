import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function ParentComponent() {
    const [count1, setCount1] = TinyReact.useState(0)
    const [count2, setCount2] = TinyReact.useState(0)

    const callback = TinyReact.useCallback(() => {
        setCount1((prevCount) => prevCount + 2)
    }, [])

    const memoValue = TinyReact.useMemo(() => {
        console.log('memo')
        return count2 + 1
    }, [count2])

    return (
        <div>
            <section>
                <button
                    onClick={() => {
                        setCount2(count2 + 1)
                    }}
                >
                    count2 +1
                </button>
                <button
                    onClick={callback}
                >
                    count1 +2
                </button>
                <p>count1 - {count1}</p>
                <p>count2Memo - {memoValue}</p>
            </section>
        </div>
    )
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
