import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

const CustomContext = TinyReact.createContext({ color: 'red', count: 1 })

function FunctionComponent(props) {
    return (
        <div>
            <p>FunctionComponent</p>
            {props.count}-{props.color}
        </div>
    )
}

const ChildComponent1 = (
    <CustomContext.Consumer>
        {
            (value) => <FunctionComponent {...value} />
        }
    </CustomContext.Consumer>
)

class ChildComponent extends TinyReact.Component {
    render() {
        return (
            <div className="child">
                child
                {this.context.count}
            </div>
        )
    }
}
ChildComponent.contextType = CustomContext

function Wrapper() {
    return (
        <div className="wrapper">
            <h1>无关紧要的包裹</h1>
            <ChildComponent />
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
        return (
            <div className="ParentComponent">
                <button onClick={this.handleClick}>+</button>
                <CustomContext.Provider value={{ count: this.state.count }}>
                    <div>
                        <Wrapper />
                        <ChildComponent1 />
                    </div>
                </CustomContext.Provider>
            </div>
        )
    }
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
