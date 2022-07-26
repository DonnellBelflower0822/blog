import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

class ChildComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        console.log('ChildComponent constructor')
    }

    static getDerivedStateFromProps() {
        console.log('ChildComponent getDerivedStateFromProps')
        return {}
    }

    componentDidMount() {
        console.log('ChildComponent componentDidMount')
    }

    componentWillUnMount() {
        console.log('ChildComponent componentWillUnMount')
    }

    shouldComponentUpdate() {
        console.log('ChildComponent shouldComponentUpdate')
        return true
    }

    componentDidUpdate() {
        console.log('ChildComponent componentDidUpdate')
    }

    render() {
        console.log('ChildComponent render')
        
        return (
            <div>
                child
                {this.props.time}
            </div>
        )
    }
}

class ParentComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        console.log('parentComponent constructor')
        this.state = { count: 0 }
    }

    static getDerivedStateFromProps() {
        console.log('parentComponent getDerivedStateFromProps')
        return {}
    }

    componentDidMount() {
        console.log('parentComponent componentDidMount')
    }

    componentWillUnMount() {
        console.log('parentComponent componentWillUnMount')
    }

    shouldComponentUpdate() {
        console.log('parentComponent shouldComponentUpdate')
        return true
    }

    componentDidUpdate() {
        console.log('parentComponent componentDidUpdate')
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        console.log('parentComponent render')

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
