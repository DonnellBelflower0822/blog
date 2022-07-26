import TinyReact from "./TinyReact/react";
import TinyReactDOM from "./TinyReact/react-dom";

const style = {
    border: '3px solid red'
}

const element = (
    <div id='A1' style={style}>
        A1
        <div id='B1' style={style}>
            B1
            <div id='C1' style={style}>C1</div>
            <div id='C2' style={style}>C2</div>
        </div>
        <div id='B2' style={style}>B2</div>
    </div>
)

TinyReactDOM.render(element, document.getElementById('root'))

