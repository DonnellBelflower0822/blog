import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

class ClassComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { count: 0 }
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1 }, () => {
            console.log('callback1', this.state.count)
        })
        console.log(1, this.state.count)    
        this.setState({ count: this.state.count + 1 }, () => {
            console.log('callback2', this.state.count)
        })
        console.log(2, this.state.count)
        Promise.resolve().then(() => {
            console.log(3, this.state.count)
            this.setState({ count: this.state.count + 1 }, () => {
                console.log('callback3', this.state.count)
            })
            console.log(4, this.state.count)
            this.setState({ count: this.state.count + 1 }, () => {
                console.log('callback4', this.state.count)
            })
            console.log(5, this.state.count)
        })
    }

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
