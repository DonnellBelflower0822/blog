import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

class Child1 extends TinyReact.PureComponent {
    render() {
        console.log('Child1 render')
        return (
            <div>
                <h2>Child1</h2>
                <div>{this.props.count1}</div>
            </div>
        )
    }
}

class Child2 extends TinyReact.PureComponent {
    render() {
        console.log('Child2 render')
        return (
            <div>
                <h2>Child2</h2>
                <div>{this.props.count2}</div>
            </div>
        )
    }
}

class ParentComponent extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { count1: 0, count2: 1 }
    }
    handleClick1 = () => {
        this.setState({ count1: this.state.count1 + 1 })
    }
    handleClick2 = () => {
        this.setState({ count2: this.state.count2 + 1 })
    }

    render() {
        return (
            <div>
                <section>
                    <button onClick={this.handleClick1}>count1 +1</button>
                    <Child1 count1={this.state.count1} />
                </section>
                <section>
                    <button onClick={this.handleClick2}>count2 +1</button>
                    <Child2 count2={this.state.count2} />
                </section>
            </div>
        )
    }
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
