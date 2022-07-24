import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function FunctionComponent() {
    const ref = TinyReact.useRef(null)
    TinyReact.useEffect(() => {
        ref.current.style.transform = 'translate(500px)'
        ref.current.style.transition = '500ms'
    }, [])
    // TinyReact.useLayoutEffect(() => {
    //     ref.current.style.transform = 'translate(500px)'
    //     ref.current.style.transition = '500ms'
    // }, [])
    return (
        <div
            style={{
                position: 'relative',
                width: '100px',
                height: '100px',
                background: '#ddd'
            }}
            ref={ref}
        >
        </div>
    )
}

TinyReactDOM.render(<FunctionComponent />, document.getElementById('root'))
