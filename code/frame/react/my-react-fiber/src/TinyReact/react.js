import { ELEMENT_TEXT } from './constant'
import { scheduleRoot, useReducer } from './schedule'
import { Update } from './UpdateQueue'

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

class Component {
    constructor (props) {
        this.props = props
    }

    setState(payload) {
        const update = new Update(payload)
        this.internalFiber.updateQueue.equeueUpdate(update)
        scheduleRoot()
    }
}

Component.isReactComponent = {}

const TinyReact = {
    createElement,
    Component,
    useReducer
}

export default TinyReact
