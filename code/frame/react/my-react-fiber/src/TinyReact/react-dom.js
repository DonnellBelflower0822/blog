import { TAG_ROOT, TAG_HOST, TAG_TEXT } from './constant'
import { scheduleRoot } from './schedule'

function render(element, container) {
    const rootFiber = {
        tag: TAG_ROOT,
        stateNode: container,
        props: {
            children: [element]
        }
    }

    scheduleRoot(rootFiber)
}

export function cretateDOM(currentFiber) {
    if (currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.props.text)
    }

    if (currentFiber.tag === TAG_HOST) {
        const stateNode = document.createElement(currentFiber.type)
        updateDomProps(stateNode, {}, currentFiber.props)
        return stateNode
    }
}

// 更新节点属性
export function updateDomProps(dom, oldProps, newProps) {
    for (const key in newProps) {
        if (key === 'children') {
            continue
        }
        const value = newProps[key]

        if (key === 'style') {
            if (value) {
                if (!dom.style) {
                    dom.style = {}
                }
                for (let styleAttr in value) {
                    dom.style[styleAttr] = value[styleAttr]
                }
            }
            continue
        }

        if (key.startsWith('on')) {
            dom[key.toLocaleLowerCase()] = newProps[key]
            continue
        }

        dom[key] = newProps[key]
    }

    if (oldProps) {
        for (const key in oldProps) {
            if (newProps[key] === undefined) {
                dom.removeAttribute(key)
            }
        }
    }
}

const TinyReactDOM = {
    render
}

export default TinyReactDOM
