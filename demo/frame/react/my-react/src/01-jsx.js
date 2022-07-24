import TinyReact from "./TinyReact/react"
import React from 'react'
/**
 * 元素 -> jsx 
 * 其实是js对象
 * 
 * 经过babel编译后变成 
 * React.createElement("div", {className: "container"}, 
 *      React.createElement("h3", null, "Hello React"), 
 *      React.createElement("p", null, "React is great ")
 * );
 */
const element1 = (
    <div className="container">
        <h3>Hello React</h3>
        <p>React is great</p>
    </div>
)

// jsx运行时会得到虚拟dom
const element1VDOM = {
    $$typeof: Symbol('react.element'),
    key: null,
    props: {
        className: 'container',
        children: [
            {
                $$typeof: Symbol('react.element'),
                key: null,
                props: {
                    children: 'Hello React'
                },
                ref: null,
                type: 'h3'
            },
            {
                $$typeof: Symbol('react.element'),
                key: null,
                props: {
                    children: 'React is great'
                },
                ref: null,
                type: 'p'
            }
        ]
    },
    ref: null,
    type: 'div'
}

console.log(element1)
// TinyReact.render(element1, document.getElementById('root'))
