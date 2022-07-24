import { updateProps } from './attribute'
import { TEXT } from './constant'
import { compareTwoVdom } from './Component'

export let scheduleUpdate = null

function render(rootVdom, container) {
    mount(rootVdom, container)
    scheduleUpdate = () => {
        compareTwoVdom(container, rootVdom, rootVdom)
    }
}

/**
 * 渲染虚拟dom
 * 1. 将vdom虚拟dom变成真实dom
 * 2. 将vdom属性更新到dom上
 * 3. 将虚拟dom的儿子们变成真实dom,挂载在自己dom上, 
 */
function mount(vdom, container) {
    const dom = createDOM(vdom)
    container.appendChild(dom)

    // if (vdom.ref) {
    //     vdom.ref = dom
    // }

    dom.componentDidMount?.()
}

// 根据虚拟dom创建真实的dom
export function createDOM(vdom) {
    const { type, props = {} } = vdom

    const { children, content } = props

    if (type === TEXT) {
        const dom = document.createTextNode(content)
        vdom.dom = dom
        return dom
    }

    // 如果是函数
    if (typeof type === 'function') {
        if (type.isReactComponent) {
            return mountClassComponent(vdom)
        } else {
            return mountFunctionComponent(vdom)
        }
    }

    // 特殊情况: createContext.Provider
    if (typeof type === 'object') {
        const realVdom = type.type(type.props)
        vdom.lastRenderVdom = realVdom
        return createDOM(realVdom)
    }

    // 元素标签
    const dom = document.createElement(type)

    if (vdom.ref) {
        vdom.ref.current = dom
    }

    // 处理属性
    updateProps(dom, props)

    // 处理children 
    if (typeof children === 'string' || typeof children === 'number' || typeof children === 'undefined') {
        dom.textContent = children
    }
    // 是虚拟dom
    else if (typeof children === 'object' && children.type) {
        mount(children, dom)
    }
    // 数组
    else if (Array.isArray(children)) {
        reconcileChildren(children, dom)
    }
    // 啥也不是
    else {
        document.textContent = children ? children.toString() : ''
    }

    vdom.dom = dom

    return dom
}

/**
 * 将类组件渲染成真实dom
 * @param {*} vdom 
 * @returns 
 */
function mountClassComponent(vdom) {
    const { type: ClassComponent, props, ref } = vdom

    // 创建类的实例
    const instance = new ClassComponent(props)

    if (ref) {
        ref.current = instance
        instance.ref = ref
    }

    // 将类挂载到ownType
    instance.ownType = ClassComponent

    if (ClassComponent.contextType) {
        instance.context = ClassComponent.contextType?.Provider?._value
    }

    // if (instance.componentWillMount) {
    //     instance.componentWillMount()
    // }

    // getDerivedStateFromProps 从props得到state
    if (ClassComponent.getDerivedStateFromProps) {
        const state = ClassComponent.getDerivedStateFromProps(instance.props, instance.state)

        instance.state = {
            ...instance.state,
            ...state
        }
    }

    // 调用实例的render方法, 返回虚拟dom
    const renderVdom = instance.render.call(instance)

    // 根据虚拟dom生成真实dom
    const dom = createDOM(renderVdom)

    instance.dom = dom

    // 上次执行render返回的虚拟dom
    instance.lastRenderVdom = renderVdom

    vdom.instance = instance

    if (instance.componentDidMount) {
        dom.componentDidMount = instance.componentDidMount.bind(instance)
    }

    return dom
}

/**
 * 将函数组件渲染成真实dom
 * @param {*} vdom 
 * @returns 
 */
function mountFunctionComponent(vdom) {
    const { type: FunctionComponent, props } = vdom

    const renderVdom = FunctionComponent(props)

    vdom.lastRenderVdom = renderVdom

    const dom = createDOM(renderVdom)

    return dom
}

/**
 * 处理虚拟dom数组变成真实dom
 * @param {*} vDomChildren 虚拟dom数组
 * @param {*} parentDOM 真实父DOM
 */
function reconcileChildren(vDomChildren, parentDOM) {
    for (let i = 0; i < vDomChildren.length; i += 1) {
        if (vDomChildren[i] !== undefined) {
            mount(vDomChildren[i], parentDOM)
        }
    }
}

const TinyReactDOM = {
    render
}

export default TinyReactDOM