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

import { ELEMENT_TEXT, PLACEMENT, TAG_HOST, TAG_ROOT, TAG_TEXT, DELETION, UPDATE, TAG_CLASS, TAG_FUNCTION } from "./constant"
import { cretateDOM, updateDomProps } from './react-dom'
import { Update, UpdateQueue } from "./UpdateQueue"

// 下一个执行单元 fiber
let nextUnitOfWork = null
// RootFiber根节点
let workInProgressRoot = null
// 当前的rootFiber
let currentRoot = null

// 当前函数的fiber
let currentFunctionFiber
let hookIndex = 0

// 删除节点
const deletions = []

// 最核心的就是props和stateNode, 其他属性都是后加的
export function scheduleRoot(rootFiber) {
    if (currentRoot?.alternate) {
        // 最少是第三次渲染
        workInProgressRoot = currentRoot.alternate
        // 重新更改指向
        workInProgressRoot.alternate = currentRoot
        if (rootFiber) {
            // 把最新的props给到当前
            workInProgressRoot.props = rootFiber.props
        }
    } else if (currentRoot) {
        // 第二次更新
        if (rootFiber) {
            rootFiber.alternate = currentRoot
            workInProgressRoot = rootFiber
        } else {
            workInProgressRoot = {
                ...currentRoot,
                alternate: currentRoot
            }
        }
    } else {
        // 初次渲染
        workInProgressRoot = rootFiber
    }

    workInProgressRoot.fisrtEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null

    nextUnitOfWork = workInProgressRoot
}

function workLoop(deadline) {
    // ==render阶段==

    // 是否交出控制权
    let shouldYield = false

    while (nextUnitOfWork && !shouldYield) {
        // 执行单个执行单元, 返回下一个执行单元
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        // 看是否还有剩余时间, 如果没有时间则交出控制权, 有时间则继续执行下一个执行单元
        shouldYield = deadline.timeRemaining() < 1
    }

    // ==end render阶段==

    if (!nextUnitOfWork && workInProgressRoot) {
        console.log('render阶段结束')
        // commit阶段
        commitRoot()
    }

    requestIdleCallback(workLoop, { timeout: 500 })
}

requestIdleCallback(workLoop, { timeout: 500 })

// 执行一个执行单元(fiber)
// 从父到子, 子完成后父才完成
// 构建fiber树和收集好effect
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber)

    // 构建fiber的顺序
    // 先大儿子
    // 其次兄弟
    // 最后父亲

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

/**
 * 1. 处理自身
 *      原生节点: 创建真实dom, 挂载到fiber.stateNode
 *      class组件: new出类的实例, 挂载到fiber.stateNode
 *                调用render获取渲染的虚拟dom
 *                继续构建子级的fiber
 * 2. 创建儿子们的fiber
 */
function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber)
    } else if (currentFiber.tag === TAG_HOST) {
        updateHostElement(currentFiber)
    } else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber)
    } else if (currentFiber.tag === TAG_CLASS) {
        // 类组件
        updateClassComponent(currentFiber)
    } else if (currentFiber.tag === TAG_FUNCTION) {
        updateFunctionComponent(currentFiber)
    }
}

function updateFunctionComponent(currentFiber) {
    currentFunctionFiber = currentFiber
    hookIndex = 0
    currentFunctionFiber.hooks = []

    const newChildren = currentFiber.type(currentFiber.props)
    reconcileChildren(currentFiber, [newChildren])
}

function updateClassComponent(currentFiber) {
    if (!currentFiber.stateNode) {
        // 类组件的stateNode存放是类的实例
        currentFiber.stateNode = new currentFiber.type(currentFiber.props)
        currentFiber.stateNode.internalFiber = currentFiber
        currentFiber.updateQueue = new UpdateQueue()
    }

    // 获取最新state
    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state)
    // 调用render, 获取最新的render虚拟dom
    const newElement = currentFiber.stateNode.render()
    reconcileChildren(currentFiber, [newElement])
}

// 处理文本
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = cretateDOM(currentFiber)
    }
}

// 处理普通元素
function updateHostElement(currentFiber) {
    // 创建真实dom
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = cretateDOM(currentFiber)
    }

    const { children } = currentFiber.props
    reconcileChildren(currentFiber, children)
}

// 处理原生节点
function updateHostRoot(currentFiber) {
    // 先处理自身
    // 如果是原生节点, 创建真实DOM
    // 创建子fiber
    const { children } = currentFiber.props

    // 创建子fiber
    reconcileChildren(currentFiber, children)
}

/**
 * 构建children的fiber
 * currentFiber则是父fiber
 * children是虚拟dom数组
 */
function reconcileChildren(currentFiber, children) {
    let newChildIndex = 0
    // 上一个兄弟fiber
    let prevSlibing

    // 旧子级fiber
    let oldFiber = currentFiber.alternate?.child

    while (newChildIndex < children.length || oldFiber) {
        let newFiber
        // 虚拟dom
        const newChild = children[newChildIndex]

        const sameType = newChild && oldFiber && newChild.type === oldFiber.type

        // 类型一样则可以复用
        if (sameType) {
            // 可以复用, 更新
            newFiber = {
                tag: oldFiber.tag,
                type: oldFiber.type,
                stateNode: oldFiber.stateNode,
                props: newChild.props,
                return: currentFiber,
                alternate: oldFiber,
                updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                effectTag: UPDATE,
                nextEffect: null,
                fisrtEffect: null
            }
        } else {
            if (newChild) {
                let tag
                if (typeof newChild.type === 'function' && newChild.type.isReactComponent) {
                    tag = TAG_CLASS
                } else if (typeof newChild.type === 'function') {
                    tag = TAG_FUNCTION
                } else if (newChild.type === ELEMENT_TEXT) {
                    tag = TAG_TEXT
                } else if (typeof newChild.type === 'string') {
                    tag = TAG_HOST
                }

                // 构建子fiber
                newFiber = {
                    tag,
                    type: newChild.type,
                    props: newChild.props,
                    // 虚拟dom对应的真实的dom
                    stateNode: null,
                    // 父级
                    return: currentFiber,
                    updateQueue: new UpdateQueue(),
                    // 副作用的标识: 增加, 删除, 更新
                    effectTag: PLACEMENT,
                    // effect list链表, 只有需要进行副作用的才会有此属性
                    nextEffect: null,
                    fisrtEffect: null
                }
            }

            if (oldFiber) {
                // 删除老的
                oldFiber.effectTag = DELETION
                deletions.push(oldFiber)
            }
        }

        // 移动旧fiber到下一个指针
        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if (newFiber) {
            // 构建fiber关系网
            if (newChildIndex === 0) {
                // 给父亲建立大儿子关系
                currentFiber.child = newFiber
            } else {
                // 给兄弟间建立兄弟关系
                prevSlibing.sibling = newFiber
            }

            prevSlibing = newFiber
        }

        newChildIndex++
    }
}

// 完成一个执行单元
// 1. 收集有effect的fiber, 组成effect list
function completeUnitOfWork(currentFiber) {
    let returnFiber = currentFiber.return

    if (returnFiber) {
        // 把儿子挂到父亲

        // 如果父亲没有firstEffect, 
        // 就证明是currentFiber是父亲的child,
        // 所以将自身的fistEffect赋给父亲的firstEffect
        if (!returnFiber.fisrtEffect) {
            returnFiber.fisrtEffect = currentFiber.fisrtEffect
        }

        // 自身有lastEffect
        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                // 上一个最新lastEffect的nextEffect指向到当前fiber的第一个effect
                returnFiber.lastEffect.nextEffect = currentFiber.fisrtEffect
            }

            // 更新父级fiber的lastEffect
            returnFiber.lastEffect = currentFiber.lastEffect
        }

        // 把自己挂到父亲
        const { effectTag } = currentFiber
        if (effectTag) {
            if (returnFiber.lastEffect) {
                // 前一个lastEffect的nextEffect指向当前fiber
                returnFiber.lastEffect.nextEffect = currentFiber
            } else {
                // 父级fiber没有lastEffect就证明是第一次遇到有副作用的子fiber
                returnFiber.fisrtEffect = currentFiber
            }

            // 父级effect的lastEffect指向当前fiber
            returnFiber.lastEffect = currentFiber
        }
    }
}

function commitRoot() {
    // 执行删除
    deletions.forEach(commitWork)

    let currentFiber = workInProgressRoot.fisrtEffect

    while (currentFiber) {
        commitWork(currentFiber)
        currentFiber = currentFiber.nextEffect
    }
    // 记录当前的rootRiber
    currentRoot = workInProgressRoot
    deletions.length = 0
    workInProgressRoot = null
}

function commitWork(currentFiber) {
    if (!currentFiber) {
        return
    }

    let returnFiber = currentFiber.return
    while (
        returnFiber.tag !== TAG_HOST
        && returnFiber.tag !== TAG_TEXT
        && returnFiber.tag !== TAG_ROOT
    ) {
        returnFiber = returnFiber.return
    }

    const returnDOM = returnFiber.stateNode

    if (currentFiber.effectTag === PLACEMENT) {
        let nextFiber = currentFiber
        while (nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_TEXT) {
            nextFiber = currentFiber.child
        }
        // 新增
        returnDOM.appendChild(nextFiber.stateNode)
    } else if (currentFiber.effectTag === DELETION) {
        commitDeletion(currentFiber, returnDOM)
        // 删除
        // returnDOM.removeChild(currentFiber.stateNode)
    } else if (currentFiber.effectTag === UPDATE) {
        // 更新
        if (currentFiber.type === ELEMENT_TEXT) {
            // 文本节点
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text
            }
        } else {
            updateDomProps(currentFiber, currentFiber.alternate.props, currentFiber.props)
        }
    }

    currentFiber.effectTag = null
}

function commitDeletion(currentFiber, returnDOM) {
    if (currentFiber.tag === TAG_HOST || currentFiber.tag === TAG_TEXT) {
        returnDOM.removeChild(currentFiber.stateNode)
    } else {
        commitDeletion(currentFiber.child, returnDOM)
    }
}

export function useReducer(reducer, initialValue) {
    let newHook = currentFunctionFiber?.alternate?.hooks?.[hookIndex]
    if (newHook) {
        newHook.state = newHook.updateQueue.forceUpdate(newHook.state)
    } else {
        // 第一次渲染
        newHook = {
            state: initialValue,
            updateQueue: new UpdateQueue()
        }
    }

    const dispatch = (action) => {
        newHook.updateQueue.equeueUpdate(
            new Update(
                typeof reducer === 'function'
                    ? reducer(newHook.state, action)
                    : action
            )
        )
        scheduleRoot()
    }

    currentFunctionFiber.hooks[hookIndex++] = newHook

    return [newHook.state, dispatch]
}
