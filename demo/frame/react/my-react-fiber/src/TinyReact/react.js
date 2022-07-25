import { ELEMENT_TEXT } from './constant'

function createElement(type, props = {}, ...children) {
    const { ref, ...restProps } = props || {}
    return {
        type,
        ref,
        props: {
            ...restProps,
            children: children.map(wrapperChildren)
        }
    }
}

function wrapperChildren(child) {
    if (typeof child === 'string' || typeof child === 'number') {
        return {
            type: ELEMENT_TEXT,
            props: {
                text: child
            }
        }
    }

    return child
}

const TinyReact = {
    createElement
}

export default TinyReact
