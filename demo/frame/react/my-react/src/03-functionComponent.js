import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

function FunctionComponent(props) {
    return (
        <div className="container">
            <h3>Hello {props.name}</h3>
            <p>React is great</p>
        </div>
    )
}

TinyReactDOM.render(<FunctionComponent />, document.getElementById('root'))
