import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

const FuncChild = (props) => {
    console.log('FuncChild render')
    return (
        <div>
            FuncChild
            {props.count2}
        </div>
    )
}

class ClassComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = {
            count1: 0,
            count2: 1
        }
    }

    handleClick = () => {
    }

    render() {
        return (
            <div className="container" ref={this.domRef}>
                <button
                    onClick={() => {
                        this.setState({ count1: this.state.count1 + 1 })
                    }}
                >
                    改变count1
                </button>
                <button
                    onClick={() => {
                        this.setState({ count2: this.state.count2 + 1 })
                    }}
                >
                    改变count2
                </button>
                <p>count1 {this.state.count1}</p>
                <FuncChild count2={this.state.count2} />
            </div>
        )
    }
}

TinyReactDOM.render(<ClassComponent />, document.getElementById('root'))
