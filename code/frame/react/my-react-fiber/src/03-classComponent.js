import TinyReact from "./TinyReact/react";
import TinyReactDOM from "./TinyReact/react-dom";

class App extends TinyReact.Component {
    constructor (props) {
        super(props)
        this.state = { count: 0 }
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h2>{this.state.count}</h2>
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1
                    })
                }}>+1</button>
            </div>
        )
    }
}

TinyReactDOM.render(<App />, document.getElementById('root'))