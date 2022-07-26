import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function withWatcher(OldComponent) {
    return class Wrapper extends TinyReact.Component {
        constructor (props) {
            super(props)
            this.state = { x: 0, y: 0 }
        }

        render() {
            return (
                <div
                    style={{ width: '100px', height: '100px', background: '#999' }}
                    onClick={(e) => {
                        this.setState({
                            x: e.clientX,
                            y: e.clientY
                        })
                    }}>
                    <OldComponent {...this.state} />
                </div>
            )
        }
    }
}

function Show(props) {
    return (
        <div>
            位置: {props.x} - {props.y}
        </div>
    )
}

const Watcher = withWatcher(Show)

class ParentComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { count: 0 }
    }
    
    handleClick = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        return (
            <div className="ParentComponent">
                <Watcher />
            </div>
        )
    }
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
