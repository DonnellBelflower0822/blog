import TinyReact from "./TinyReact/react"
import TinyReactDOM from "./TinyReact/react-dom"

const element1 = (
    <div className="container">
        <h3>Hello React</h3>
        <p>React is great</p>
    </div>
)

TinyReactDOM.render(element1, document.getElementById('root'))
