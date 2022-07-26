import Component, { PureComponent } from "./Component"
import { TEXT } from './constant'
import createContext from './createContext'
import * as hooks from './hooks'

function createElement(type, props = {}, children) {
    const { ref, ...restProps } = props || {}
    if (arguments.length > 3) {
        children = [...arguments].slice(2).map(wrapperChildren)
    } else {
        children = wrapperChildren(children)
    }
    return {
        type,
        ref,
        props: {
            ...restProps,
            children
        }
    }
}

function wrapperChildren(child) {
    if (typeof child === 'string' || typeof child === 'number') {
        return {
            type: TEXT,
            props: {
                content: child
            }
        }
    }

    return child
}

function createRef(current = null) {
    return { current }
}

function forwardRef(FunctionComponent) {
    return class extends PureComponent {
        render() {
            return FunctionComponent(this.props, this.ref)
        }
    }
}

const TinyReact = {
    createElement,
    Component,
    PureComponent,
    createContext,
    createRef,
    forwardRef,
    memo,
    ...hooks
}

function memo(MemoComponent, areEqual) {
    // 如果传了比对函数
    if (areEqual) {
        // 如果一致, 则返回true
        return class extends Component {
            shouldComponentUpdate(nextProps) {
                return !areEqual(this.props, nextProps)
            }
            render() {
                return MemoComponent(this.props)
            }
        }
    }

    return class extends PureComponent {
        render() {
            return MemoComponent(this.props)
        }
    }

}

export default TinyReact