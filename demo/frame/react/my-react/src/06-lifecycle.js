import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

class ClassComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { count: 0 }
        console.log('constructor')
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    shouldComponentUpdate(props, state) {
        console.log('shouldComponentUpdate')
        return true
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3 style={{ backgroundColor: 'red' }}>Hello {this.props.name}</h3>
                <p onClick={this.handleClick}>React is {this.state.count}</p>
            </div>
        )
    }
}

TinyReactDOM.render(<ClassComponent />, document.getElementById('root'))
