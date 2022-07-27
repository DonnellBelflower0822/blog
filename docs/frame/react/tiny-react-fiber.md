# 手写react16(fiber+hook+dom-diff)

## 前置知识
### requestAnimationFrame

> 你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

### 实现休眠函数

```js
const sleep = (delayMs) => {
    for (let start = Date.now(); Date.now() - start <= delayMs;) {
    }
}
const sleep = (delayMs) => {
    const start = Date.now()
    while (Date.now()-start<=delayMs) {
    }
}
```

### requestIdleCallback

> 这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。

```js
const tasks = [
    () => {
        console.log('任务1开始')
        sleep(20)
        console.log('任务1结束')
    },
    () => {
        console.log('任务2开始')
        sleep(20)
        console.log('任务2结束')
    },
    () => {
        console.log('任务3开始')
        sleep(20)
        console.log('任务3结束')
    },
]

requestIdleCallback(workLoop, { timeout: 1000 })

function workLoop(deadline) {
    console.log('deadline', deadline.timeRemaining())
    /**
     * 本帧还有剩余时间或者任务已经超时
     * 并且还有任务
     */
    if ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
        preformUnitOfWork()
    }

    // 本帧没有剩余时间, 需要把控制权交还给浏览器
    if (tasks.length > 0) {
        // 还有任务需要向浏览器申请空闲时间执行
        requestIdleCallback(workLoop, { timeout: 1000 })
    }
}

function preformUnitOfWork() {
    tasks.shift()()
}
```

### 链表更新state

```js
type BaseState = Record<string, unknown>
type StatePayload = object | ((prevState: object) => object)

class Updater {
    nextUpdater: Updater | null
    payload: StatePayload

    constructor(payload: StatePayload, nextUpdater: Updater | null = null) {
        this.payload = payload
        // next指针, 指向下一个更新
        this.nextUpdater = nextUpdater
    }
}

class UpdateQueue {
    baseState: null | BaseState
    firstUpdater: null | Updater
    lastUpdater: null | Updater

    constructor() {
        // 原状态
        this.baseState = null
        // 第一个更新
        this.firstUpdater = null
        // 最后一个更新
        // 作为中间值
        //      1. 上一个更新.nextUpdater指向当前更新
        //      2. 更新最后一个更新为当前值
        this.lastUpdater = null
    }

    queueUpdater(updater: Updater) {
        if (!this.firstUpdater) {
            // 第一次
            this.firstUpdater = this.lastUpdater = updater
            return
        }
        // 更新后续
        if (this.lastUpdater) {
            // 给上一个更新绑定nextUpdater到当前更新
            this.lastUpdater.nextUpdater = updater
            // 将当成更新作为最后一个更新
            this.lastUpdater = updater
        }
    }

    forceUpdate() {
        let currentState = this.baseState || {}
        let currentUpdater = this.firstUpdater

        // 递归调用nextUpdater
        while (currentUpdater) {
            const nextState = typeof currentUpdater.payload === 'function'
                ? currentUpdater.payload(currentState)
                : currentUpdater.payload
            currentState = { ...currentState, ...nextState }

            currentUpdater = currentUpdater.nextUpdater
        }

        this.firstUpdater = this.lastUpdater = null
        this.baseState = currentState

        return currentState
    }
}

const queue = new UpdateQueue()
queue.queueUpdater(
    new Updater({ name: 'allen' })
)
queue.queueUpdater(
    new Updater({ age: 27 })
)
queue.queueUpdater(
    new Updater((state: { age: number }) => ({ age: state.age + 1 }))
)
queue.queueUpdater(
    new Updater((state: { age: number }) => ({ age: state.age + 1 }))
)

queue.forceUpdate()

console.log(queue.baseState)
```

## fiber

<img src="./img/chain.jpg" />

- 顺序
  - 大儿子 `child`
  - 下一个兄弟 `slibing`
  - 返回父亲 `return`

```js
let nextUnitOfWork = null

// 开始工作循环
function workLoop(deadline) {
    // 还有剩余时间, 未过期
    // 还有下一个工作单元
    while (
        (deadline.timeRemaining() > 0 || deadline.didTimeout) 
        && nextUnitOfWork
    ) {
        nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
    }

    if (!nextUnitOfWork) {
        console.log('render ended')
        nextUnitOfWork = null
        return
    }

    requestIdleCallback(workLoop, { timeout: 1000 })
}

// 处理单个执行单元 -> 返回下一个执行单元
function preformUnitOfWork(fiber) {
    // 开始
    beginWork(fiber)

    // 1. 有大儿子
    if (fiber.child) {
        return fiber.child
    }

    // 没有儿子, 则表示此fiber结束
    while (fiber) {
        // 当前fiber完成
        completeUnitOfWork(fiber)

        // 2. 有兄弟就返回兄弟
        if (fiber.slibing) {
            return fiber.slibing
        }

        // 3. 返回父亲
        fiber = fiber.return
    }
}

function beginWork(fiber) {
    console.log('开始', fiber.props.key)
}

function completeUnitOfWork(fiber) {
    console.log('完成', fiber.props.key)
}

function start(newNextUnitOfWork) {
    nextUnitOfWork = newNextUnitOfWork
    requestIdleCallback(workLoop, { timeout: 1000 })
}
```

**示例**

```js
const A1 = { type: 'div', props: { key: 'A1' } }

const B1 = { type: 'div', props: { key: 'B1' }, return: A1 }
const B2 = { type: 'div', props: { key: 'B2' }, return: A1 }

const C1 = { type: 'div', props: { key: 'C1' }, return: B1 }
const C2 = { type: 'div', props: { key: 'C2' }, return: B1 }

A1.child = B1

B1.slibing = B2

B1.child = C1

C1.slibing = C2

start(A1)

// 开始 A1
// 开始 B1
// 开始 C1
// 完成 C1
// 开始 C2
// 完成 C2
// 完成 B1
// 开始 B2
// 完成 B2
// 完成 A1
// render ended
```

## 数据结构

```ts
type FunctionComponent<T = any> = (props: T) => VDOM
interface VDOM {
    type: string | TinyReact.Component | TinyReact.PureComponent | FunctionComponent
    props: any
}

interface Fiber {
    stateNode?: HTMLElement | TinyReact.Component | TinyReact.PureComponent
    // Root根 Host原生元素 Text文本 Class类组件, Function函数组件
    tag: Symbol,
    props: VDOM['props'],

    return: Fiber,
    child: Fiber
    slibing: Fiber

    updateQueue: UpdateQueue,
    // PLACEMENT新增
    // UPDATE更新
    // DELETION删除
    effectTag: Symbol,

    nextEffect?: Fiber,
    lastEffect?: Fiber,
    nextEffect?: Fiber
}
```

## TinyReactDOM.render

```js
function render(element, container) {
    // 构建根fiber
    const rootFiber = {
        tag: TAG_ROOT,
        stateNode: container,
        props: {
            children: [element]
        }
    }

    // 调度根fiber
    scheduleRoot(rootFiber)
}
```

## scheduleRoot
```js
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
```

## 主体代码

```js
requestIdleCallback(workLoop, { timeout: 500 })

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
```

## performUnitOfWork
> 执行单个执行单元, 返回下一个执行单元

父(开始) -》子(开始) -》 子(结束) -》 父(结束) 

```js
function performUnitOfWork(currentFiber) {
    // 处理当前fiber
    // 构建子级fiber及fiber关系
    beginWork(currentFiber)

    // 执行单个执行单元的顺序
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
```

## beginWork

总体任务
- 处理自身
  - 原生元素: 创建真实DOM
  - 类组件: 创建实例
- 构建子级fiber

```js
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
```

### 根节点`updateHostRoot`

```js
function updateHostRoot(currentFiber) {
    const { children } = currentFiber.props
    // 创建子fiber
    reconcileChildren(currentFiber, children)
}
```

### 原生元素

- 创建真实DOM
- 构建子级fiber

```js
function updateHostElement(currentFiber) {
    // 创建真实dom
    if (!currentFiber.stateNode) {
        // 根据fiber创建真实dom
        currentFiber.stateNode = cretateDOM(currentFiber)
    }

    const { children } = currentFiber.props
    reconcileChildren(currentFiber, children)
}
```

### 文本节点

- 创建真实DOM

```js
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = cretateDOM(currentFiber)
    }
}
```

### 类组件updateClassComponent

- stateNode存放类实例

```js
function updateClassComponent(currentFiber) {
    if (!currentFiber.stateNode) {
        // 类组件的stateNode存放是类的实例
        currentFiber.stateNode = new currentFiber.type(
            currentFiber.props
        )
        currentFiber.stateNode.internalFiber = currentFiber
        currentFiber.updateQueue = new UpdateQueue()
    }

    // 获取最新state
    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state)
    // 调用render, 获取最新的render虚拟dom
    const newElement = currentFiber.stateNode.render()
    reconcileChildren(currentFiber, [newElement])
}
```

### 函数组件 updateFunctionComponent

```js
function updateFunctionComponent(currentFiber) {
    // 记录当前的fiber, 后续hook找到当前的函数fiber是谁
    currentFunctionFiber = currentFiber
    // 重置为0
    hookIndex = 0
    // 重置hooks
    currentFunctionFiber.hooks = []

    const newChildren = currentFiber.type(currentFiber.props)
    reconcileChildren(currentFiber, [newChildren])
}
```

## 构建children的fiber

```js
/**
 * 构建children的fiber
 * currentFiber则是父fiber
 * children是虚拟dom数组
 */
function reconcileChildren(currentFiber, children) {
    let newChildIndex = 0
    // 上一个兄弟fiber
    let prevSlibing

    // 旧子级fiber, 已经渲染过了
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
                // 标记 前一次的fiber
                alternate: oldFiber,
                updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                effectTag: UPDATE,
                nextEffect: null,
                fisrtEffect: null
            }
        } else {
            // 新增
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

            // 卸载旧fiber
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

        // 构建fiber兄弟与父子关系
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
```

## completeUnitOfWork
> 完成一个执行单元

- 收集effect list链表

```js
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
```

## commit阶段

```js
function commitRoot() {
    // 执行删除, 删除的会收集到数组中
    deletions.forEach(commitWork)

    // 根据 effect 链条进行commitWork
    let currentFiber = workInProgressRoot.fisrtEffect

    while (currentFiber) {
        commitWork(currentFiber)
        currentFiber = currentFiber.nextEffect
    }
    // 渲染完成后 把当前workInProgressRoot赋值给rootRiber
    currentRoot = workInProgressRoot
    deletions.length = 0
    workInProgressRoot = null
}

// 执行各种dom操作
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
        // 需要找到真实的原生元素或文本的fiber
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
```

## hook


### useReducer

```js
export function useReducer(reducer, initialValue) {
    let newHook = currentFunctionFiber?.alternate?.hooks?.[hookIndex]
    if (newHook) {
        // 后续
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

```
