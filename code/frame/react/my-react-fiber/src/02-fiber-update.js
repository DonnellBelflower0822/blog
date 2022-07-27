import TinyReact from "./TinyReact/react";
import TinyReactDOM from "./TinyReact/react-dom";

const style = {
    border: '3px solid red',
    margin: '5px'
}

const element = (
    <div id='A1' style={style}>
        A1Text
        <div id='B1' style={style}>
            B1Text
            <div id='C1' style={style}>C1Text</div>
            <div id='C2' style={style}>C2Text</div>
        </div>
        <div id='B2' style={style}>B2Text</div>
    </div>
)

TinyReactDOM.render(element, document.getElementById('root'))

const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', () => {
    const element = (
        <div id='A1' style={style}>
            A1Text-new
            <div id='B1' style={style}>
                B1Text-new
                <div id='C1' style={style}>C1Text-new</div>
                <div id='C2' style={style}>C2Text-new</div>
            </div>
            <div id='B2' style={style}>B2Text-new</div>
            <div id='B3' style={style}>B3</div>
        </div>
    )

    TinyReactDOM.render(element, document.getElementById('root'))
})

const btn2 = document.getElementById('btn2')
btn2.addEventListener('click', () => {
    const element = (
        <div id='A1' style={style}>
            A1Text
            <div id='B1' style={style}>
                B1Text
                <div id='C1' style={style}>C1Text</div>
                <div id='C2' style={style}>C2Text</div>
            </div>
            <div id='B2' style={style}>B2Text</div>
        </div>
    )

    TinyReactDOM.render(element, document.getElementById('root'))
})