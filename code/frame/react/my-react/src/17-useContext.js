import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

const CustomContext = TinyReact.createContext({ color: 'red', count: 1 })

function FunctionComponent(props) {
    const context = TinyReact.useContext(CustomContext)
    return (
        <div>
            <p>FunctionComponent</p>
            {context.count}-{context.color}
        </div>
    )
}

function Wrapper() {
    return (
        <div className="wrapper">
            <h1>无关紧要的包裹</h1>
            <FunctionComponent />
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
                    </div>
                </CustomContext.Provider>
            </div>
        )
    }
}

TinyReactDOM.render(<ParentComponent />, document.getElementById('root'))
