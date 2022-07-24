import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

const FuncChild = TinyReact.forwardRef((props, ref) => {
    const inputRef = TinyReact.useRef()

    TinyReact.useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus()
        }
    }))

    return (
        <input ref={inputRef} />
    )
})

class ClassComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.forwardRef = TinyReact.createRef()
    }

    handleClick = () => {
        // 全量交给父级ref权限太大
        // this.forwardRef.current.parentNode.removeChild(this.forwardRef.current)
        this.forwardRef.current.focus()
    }

    render() {
        return (
            <div className="container" ref={this.domRef}>
                <label onClick={this.handleClick}>label</label>
                <FuncChild ref={this.forwardRef} />
            </div>
        )
    }
}

TinyReactDOM.render(<ClassComponent />, document.getElementById('root'))
