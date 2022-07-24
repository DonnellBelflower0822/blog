import { createDOM } from './react-dom'
import Updater from './Updater'
import { updateProps } from './attribute'
import { TEXT } from './constant'
import { toArray, shallowEqual } from './utils'

export default class Component {
    // 标识是函数组件还是类组件
    static isReactComponent = true

    constructor (props) {
        this.props = props
        this.updater = new Updater(this)
    }

    setState(partialState, cb) {
        this.updater.addState(partialState, cb)
    }

    // 强制更新
    forceUpdate = () => {
        const newRenderVdom = this.render.call(this)
        const prevProps = this.lastRenderVdom.props
        const prevState = this.state

        const oldDOM = findDOM(this.lastRenderVdom)

        // 比较两个虚拟dom
        compareTwoVdom(
            oldDOM?.parentNode || null,
            this.lastRenderVdom,
            newRenderVdom,
        )
        this.lastRenderVdom = newRenderVdom
        this.componentDidUpdate?.(prevProps, prevState)
    }
}

export class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        try {
            return !(shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState))
        } catch (e) {
            console.log(e)
        }
    }
}

// dom diff
export function compareTwoVdom(parentDOM, lastRenderVdom, newRenderVdom, nextDOM) {
    // 新旧虚拟dom都没有, 什么都不用做
    if (!lastRenderVdom && !newRenderVdom) {
        return
    }

    // 旧的有虚拟dom, 新的没有虚拟dom, 走卸载
    if (lastRenderVdom && !newRenderVdom) {
        const currentDOM = findDOM(lastRenderVdom)
        if (currentDOM) {
            parentDOM.removeChild(currentDOM)
        }

        lastRenderVdom.instance?.componentWillUnMount?.()
        return
    }

    // 旧的没有, 新的有虚拟dom -> 挂载流程
    if (!lastRenderVdom && newRenderVdom) {
        const newDOM = createDOM(newRenderVdom)
        if (nextDOM) {
            parentDOM.insertBefore(newDOM, nextDOM)
        } else {
            parentDOM.appendChild(newDOM)
        }
        newDOM?.componentDidMount?.()
        return newRenderVdom
    }

    // 新老都有, 但类型不一致
    if (lastRenderVdom.type !== newRenderVdom.type) {
        const oldDOM = findDOM(lastRenderVdom)
        const newDOM = createDOM(newRenderVdom)
        lastRenderVdom.classInstance?.componentWillUnMount?.()
        parentDOM.replaceChild(newDOM, oldDOM)
        return newRenderVdom
    }

    // 深度dom-diff
    updateElement(lastRenderVdom, newRenderVdom)
}

// dom-diff
function updateElement(lastRenderVdom, newRenderVdom) {
    const { type } = lastRenderVdom
    // 文本节点
    if (type === TEXT) {
        const { dom: currentDOM } = lastRenderVdom
        newRenderVdom.dom = currentDOM
        if (lastRenderVdom.props.content === newRenderVdom.props.content) {
            return
        }
        currentDOM.textContent = newRenderVdom.props.content
        return
    }

    // 原生元素
    if (typeof type === 'string') {
        // 将原来的dom赋值到新的虚拟dom上
        const { dom: currentDOM } = lastRenderVdom
        newRenderVdom.dom = currentDOM

        // 更新属性
        updateProps(currentDOM, newRenderVdom.props, lastRenderVdom.props)

        // 更新子节点
        updateChildren(currentDOM, lastRenderVdom.props.children, newRenderVdom.props.children)
        return
    }

    // 类组件
    if (type.isReactComponent) {
        updateClassComponent(lastRenderVdom, newRenderVdom)
        return
    }

    // 函数组件
    // console.log(type)
    updateFunctionComponent(lastRenderVdom, newRenderVdom)
}

// 核心dom-diff
function updateChildren(parentDOM, lastRendeChildren, newRenderChildren) {
    lastRendeChildren = toArray(lastRendeChildren)
    newRenderChildren = toArray(newRenderChildren)

    const maxLength = Math.max(lastRendeChildren.length, newRenderChildren.length)
    for (let i = 0; i < maxLength; i += 1) {
        const nextDOM = lastRendeChildren.find((vdom, index) => index > i && vdom && vdom.dom)
        compareTwoVdom(parentDOM, lastRendeChildren[i], newRenderChildren[i], nextDOM?.dom)
    }
}

function findDOM(vdom) {
    if (!vdom) {
        return
    }

    const { type } = vdom

    if (typeof type === 'string' || typeof type === 'symbol') {
        return vdom.dom
    }

    // 类组件
    if (type.isReactComponent) {
        if (vdom.instance.dom) {
            return vdom.instance.dom
        }
        return findDOM(vdom.instance)
    }

    return findDOM(vdom.lastRenderVdom)
}

// 更新类组件
function updateClassComponent(lastVdom, newVdom) {
    const { instance } = lastVdom
    newVdom.instance = instance

    if (instance.ownType.contextType) {
        instance.context = instance.ownType.contextType?.Provider?._value
    }

    instance.updater.emitUpdate(newVdom.props)
}

// 更新函数式组件
function updateFunctionComponent(lastVdom, newVdom) {
    const parentDOM = findDOM(lastVdom).parentNode
    const { type, props } = newVdom

    let newRenderVdom
    if (typeof type === 'function') {
        newRenderVdom = type(props)
    } else {
        // 处理 例如Context.Consumer
        console.log(type)
        newRenderVdom = type.type(type.props)
    }

    compareTwoVdom(parentDOM, lastVdom.lastRenderVdom, newRenderVdom)

    newVdom.lastRenderVdom = newRenderVdom
}