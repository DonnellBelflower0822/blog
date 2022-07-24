import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function FunctionComponent() {
    const [count1, setCount1] = TinyReact.useState(0)
    const [count2, setCount2] = TinyReact.useState(0)
    TinyReact.useEffect(() => {
        console.info('useEffect without deps')
        return () => {
            console.info('destory useEffect without deps')
        }
    })
    TinyReact.useEffect(() => {
        console.info('useEffect without empty deps')
        return () => {
            console.info('destory useEffect empty deps')
        }
    }, [])
    TinyReact.useEffect(() => {
        console.info('useEffect without count2 deps')
        return () => {
            console.info('destory useEffect count2 deps')
        }
    }, [count2])
    return (
        <div>
            <p onClick={() => {
                setCount1(count1 + 1)
            }}>FunctionComponent</p>
        </div>
    )
}

TinyReactDOM.render(<FunctionComponent />, document.getElementById('root'))
