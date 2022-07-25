/**
 * 从根节点开始渲染和调度
 * 两个阶段
 *      diff阶段/render阶段
 *          对比新旧虚拟DOM, 进行增量 更新或创建 
 *          这个阶段比较花时间, 对任务拆分
 *          可以中断
 *          任务
 *              根据虚拟dom生成fiber
 *              收集effect list
 *      commit
 *          进行dom更新创建阶段
 *          不能中断
 */

import { ELEMENT_TEXT, PLACEMENT, TAG_HOST, TAG_ROOT, TAG_TEXT } from "./constant"
import { cretateDOM } from './react-dom'

// 下一个执行单元 fiber
let nextUnitOfWork = null
// RootFiber根节点
let workInProgressRoot = null

export function scheduleRoot(rootFiber) {
    nextUnitOfWork = rootFiber

    workInProgressRoot = rootFiber
}

function performUnitOfWork(currentFiber) {
    beginWork(currentFiber)

    if (currentFiber.child) {
        // 有大儿子
        return currentFiber.child
    }

    while (currentFiber) {
        // 自己完成
        completeUnitOfWork(currentFiber)

        if (currentFiber.sibling) {
            // 有弟弟
            return currentFiber.sibling
        }

        // 父亲
        currentFiber = currentFiber.return
    }
}

// 开始
// 1. 创建dom
// 2. 创建子fiber(所有儿子)
function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber)
    } else if (currentFiber.tag === TAG_HOST) {
        updateHostElement(currentFiber)
    } else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber)
    }
}

// 处理文本
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = cretateDOM(currentFiber)
    }
}

// 处理普通元素
function updateHostElement(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = cretateDOM(currentFiber)
    }

    const { children } = currentFiber.props
    reconcileChildren(currentFiber, children)
}

function updateHostRoot(currentFiber) {
    // 先处理自身
    // 如果是原生节点, 创建真实DOM
    // 创建子fiber
    const { children } = currentFiber.props

    // 创建子fiber
    reconcileChildren(currentFiber, children)
}

function reconcileChildren(currentFiber, children) {
    let newChildIndex = 0
    // 上一个兄弟fiber
    let prevSlibing

    while (newChildIndex < children.length) {
        const newChild = children[newChildIndex]
        let tag

        if (newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT
        } else if (typeof newChild.type === 'string') {
            tag = TAG_HOST
        }

        const newFiber = {
            tag,
            type: newChild.type,
            props: newChild.props,
            // 虚拟dom对应的真实的dom
            stateNode: null,
            // 父级
            return: currentFiber,
            // 副作用的标识: 增加, 删除, 更新
            effectTag: PLACEMENT,
            // effect list链表, 只有需要进行副作用的才会有此属性
            nextEffect: null,
            fisrtEffect: null
        }

        if (newFiber) {
            if (newChildIndex === 0) {
                // 大儿子
                currentFiber.child = newFiber
            } else {
                // 兄弟
                prevSlibing.sibling = newFiber
            }

            prevSlibing = newFiber
        }

        newChildIndex++
    }
}

// p5
// p7

// 完成一个执行单元
// 1. 收集有effect的fiber, 组成effect list
function completeUnitOfWork(currentFiber) {
    let returnFiber = currentFiber.return
    if (returnFiber) {
        // 把儿子挂到父亲
        if (!returnFiber.fisrtEffect) {
            returnFiber.fisrtEffect = currentFiber.fisrtEffect
        }

        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.fisrtEffect
            }
            returnFiber.lastEffect = currentFiber.lastEffect
        }

        // 把自己挂到父亲
        const { effectTag } = currentFiber
        if (effectTag) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber
            } else {
                returnFiber.fisrtEffect = currentFiber
            }

            returnFiber.lastEffect = currentFiber
        }
    }
}

function workLoop(deadline) {
    // 是否交出控制权
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        // 执行单个执行单元
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }

    if (!nextUnitOfWork && workInProgressRoot) {
        console.log('render阶段结束')
        commitRoot()
    }

    requestIdleCallback(workLoop, { timeout: 500 })
}

requestIdleCallback(workLoop, { timeout: 500 })

function commitRoot() {
    let currentFiber = workInProgressRoot.fisrtEffect

    while (currentFiber) {
        console.log('currentFiber', currentFiber.type, currentFiber.props)
        commitWork(currentFiber)
        currentFiber = currentFiber.nextEffect
    }
    workInProgressRoot = null
}

function commitWork(currentFiber) {
    if (!currentFiber) {
        return
    }

    const returnFiber = currentFiber.return
    const returnDOM = returnFiber.stateNode

    if (currentFiber.effectTag === PLACEMENT) {
        returnDOM.appendChild(currentFiber.stateNode)
    }

    currentFiber.effectTag = null
}