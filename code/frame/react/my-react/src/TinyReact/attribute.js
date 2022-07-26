import addEvent from './addEvent'

/**
 * 处理属性
 */

// 将props属性更新到dom元素身上
export function updateProps(currentDOM, newProps, lastProps) {
    for (let key in newProps) {
        // 过滤点children
        if (key === 'children') {
            continue
        }

        // 新旧一致
        if (lastProps && lastProps[key] === newProps[key]) {
            continue
        }

        // 处理样式
        if (key === 'style') {
            for (const attr in newProps[key]) {
                currentDOM.style[attr] = newProps[key][attr]
            }
            continue
        }

        if (key.startsWith('on')) {
            addEvent(currentDOM, key.toLocaleLowerCase(), newProps[key])
            continue
        }

        currentDOM.setAttribute(key, newProps[key])
    }

    if (!lastProps) {
        return
    }

    for (const key in lastProps) {
        if (newProps[key] === undefined) {
            currentDOM.removeAttribute(key)
        }
    }
}