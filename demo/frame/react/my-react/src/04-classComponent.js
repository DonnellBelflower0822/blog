import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

class ClassComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { count: 0 }
    }

    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    // handleClick() {
    //     // undefined
    //     console.log(this)
    // }

    render() {
        return (
            <div className="container">
                <h3 style={{ backgroundColor: 'red' }}>Hello {this.props.name}</h3>
                <p onClick={this.handleClick}>React is {this.state.count}</p>
            </div>
        )
    }
}

TinyReactDOM.render(<ClassComponent />, document.getElementById('root'))
