import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function ChildComponent(props) {
    return (
        <div>
            child
            {props.time}
        </div>
    )
}

class ParentComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { count: 0 }
    }
    handleClick = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        const props = {
            className: `container-${this.state.count}`
        }
        if (this.state.count === 1) {
            props.style = { color: 'red' }
        }
        return (
            <div
                {...props}
            >
                <p>{this.state.count}</p>
                {this.state.count === 4 ? null : <ChildComponent time={this.state.count} />}
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
