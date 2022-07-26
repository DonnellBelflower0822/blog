import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

class Child extends TinyReact.Component {
    render() {
        return (
            <div>
                Child
            </div>
        )
    }
}

const FuncChild = TinyReact.forwardRef((props, ref) => {
    return (
        <div ref={ref}>FuncChild</div>
    )
})

class ClassComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.domRef = TinyReact.createRef()
        this.classRef = TinyReact.createRef()
        this.forwardRef = TinyReact.createRef()
    }

    handleClick = () => {
        console.log('domRef', this.domRef)
        console.log('classRef', this.classRef)
        console.log('forwardRef', this.forwardRef)
    }

    render() {
        return (
            <div className="container" onClick={this.handleClick} ref={this.domRef}>
                ref
                <Child ref={this.classRef} />
                <FuncChild ref={this.forwardRef} />
            </div>
        )
    }
}

TinyReactDOM.render(<ClassComponent />, document.getElementById('root'))
