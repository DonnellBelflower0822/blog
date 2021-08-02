# fiber

## 架构

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

## requestIdleCallback

> 利用浏览器的空余时间执行任务，如果有更高优先级的任务要执行时，当前执行的任务可以被终止，优先执行高级别任务。

> 页面是一帧一帧绘制出来的，当每秒绘制的帧数达到 60 时，页面是流畅的，小于这个值时， 用户会感觉到卡顿

> 1s 60帧，每一帧分到的时间是 1000/60 ≈ 16 ms，如果每一帧执行的时间小于16ms，就说明浏览器有空余时间

如果任务在剩余的时间内没有完成则会停止任务执行，继续优先执行主任务，也就是说 requestIdleCallback 总是利用浏览器的空余时间执行任务

```js
function calc(idleDeadline) {
  // 当剩余时间大于1时才执行
  while (count > 0 && idleDeadline.timeRemaining() > 1) {
    console.log(11)
    value = Math.random() < 0.4 ? Math.random() : Math.random()
    count--
  }
  // 再次去申请浏览器空余时间执行
  requestIdleCallback(calc)
}

btn1.onclick = () => {
  // 申请浏览器空余时间执行calc计算方法
  requestIdleCallback(calc)
}
```

## 问题

> 对更新 VirtualDOM 递归无法中断，执行重任务耗时长。 JavaScript 又是单线程，无法同时执行其他任务，导致任务延迟页面卡顿，用户体验差。

## 方案

1. 利用浏览器空闲时间执行任务，拒绝长时间占用主线程
2. 放弃递归只采用循环，因为循环可以被中断
3. 任务拆分，将任务拆分成一个个的小任务

## 思路

在 Fiber 方案中，为了实现任务的终止再继续，DOM比对算法被分成了两部分：

1. 构建 Fiber (Reconciler)       (可中断)
2. 提交 Commit (Renderer)  (不可中断)

DOM 初始渲染: virtualDOM -> Fiber -> Fiber[] -> DOM

DOM 更新操作: newFiber vs oldFiber -> Fiber[] -> DOM

Fiber 对象

```
{
  type         节点类型 (元素, 文本, 组件)
  props        节点属性
  stateNode    节点 DOM 对象 | 组件实例对象 | 函数组件
  tag          节点标记 (hostRoot || hostComponent || classComponent || functionComponent)
  effects      数组, 存储需要更改的 fiber 对象
  effectTag    当前 Fiber 要被执行的操作 (新增, 删除, 修改)

  return       当前 Fiber 的父级 Fiber
  child        当前 Fiber 的大儿子 Fiber
  sibling      当前 Fiber 的下一个兄弟 Fiber
  alternate    Fiber 备份 fiber 比对时使用
}
```

## 步骤
### 挂载
- 调用render,往任务队列添加任务,
- 将虚拟dom构建成fiber(Reconciler协调器)(申请浏览器空闲时执行任务)(异步可中断)
  - 处理children
    - 为每个child构建fiber
      - 记录return(父fiber),child(大儿子fiber),slibing(兄弟fiber)
    - 标记effectTag
  - 如果有child(大儿子): 处理child
  - 如果有slibing(兄弟节点): 处理slibing
  - 都没有处理父亲的兄弟节点(slibing)
  - 记录当前的effects, 从里到外的顺序
- commitAllWork(将更新effects插入dom上)(renderer)(同步)
  - 根据遍历effects执行更新,删除,挂载等操作
### 更新
- 往任务队列添加组件更新任务
- 从rootFiber开始
- 将虚拟dom构建成fiber(此时就有alternate)
  - 可以比较虚拟dom和旧的fiber的差异
  - 给fiber打上不同的effectTag
- commitAllWork(renderer)(同步)

## 实现
```js
import { arrified, createStateNode, getRootFiber, getTag } from '../utils'
import { updateNodeElement } from '../utils/dom'
import taskQueue from '../utils/taskQueue'

/**
 * 1. 往任务队列添加任务
 * 2. 在浏览器空闲时执行任务
 * 
 * 任务
 * 通过vdom构建fiber对象
 */

let subTask = null

// 获取第一个任务
function getFirstTask() {
  const task = taskQueue.pop()

  // 组件状态更新
  if (task.from === 'class_component') {
    // 通过类组件实例找到根fiber
    const rootFiber = getRootFiber(task.instance)
    // 将更新的state记录到fiber身上
    task.instance.__fiber.partialState = task.partialState

    return {
      props: rootFiber.props,
      stateNode: rootFiber.stateNode,
      tag: "host_root",
      effects: [],
      return: null,
      child: null,
      alternate: rootFiber
    }
  }

  // 返回最外层的fiber对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    return: null,
    child: null,
    alternate: task.dom.__rootFiber
  }
}

let pendingCommit = null

function commitAllWork(fiber) {
  fiber.effects.forEach(effect => {
    if (effect.tag === 'class_component') {
      // 如果是类组件,记录fiber到实例上
      effect.stateNode.__fiber = effect
    }

    if (effect.effectTag === 'placement') {
      // 挂载
      let currentFiber = effect
      let parentFiber = effect.return

      // 如果是类组件或函数组件,需要往上找,找到普通dom节点
      while (
        parentFiber.tag === 'class_component'
        || parentFiber.tag === 'function_component'
      ) {
        parentFiber = parentFiber.return
      }

      if (currentFiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(currentFiber.stateNode)
      }
    } else if (effect.effectTag === 'update') {
      // 更新
      if (effect.type === effect.alternate.type) {
        // 节点类型相同
        updateNodeElement(effect.stateNode, effect, effect.alternate)
      } else {
        // 节点类型不同
        effect.return.stateNode.replaceChild(
          effect.stateNode,
          effect.alternate.stateNode
        )
      }
    } else if (effect.effectTag === 'delete') {
      // 删除
      effect.return.stateNode.removeChild(effect.stateNode)
    }
  })

  // 备份旧的fiber对象到dom
  fiber.stateNode.__rootFiber = fiber
}

function reconcileChildren(returnFiber, jsxElementChildren) {
  const arrifiedChildren = arrified(jsxElementChildren)

  let index = 0
  const { length } = arrifiedChildren
  let jsxElement = null
  let newFiber = null
  let prevFiber = null

  let alternate = null

  if (returnFiber.alternate && returnFiber.alternate.child) {
    alternate = returnFiber.alternate.child
  }

  while (index < length || alternate) {
    jsxElement = arrifiedChildren[index]

    if (jsxElement && !alternate) {
      // 初始渲染
      newFiber = {
        type: jsxElement.type,
        props: jsxElement.props,
        effects: [],
        effectTag: 'placement',
        tag: getTag(jsxElement),
        // 指定父级
        return: returnFiber,
      }

      newFiber.stateNode = createStateNode(newFiber)
    } else if (jsxElement && alternate) {
      // 更新操作
      newFiber = {
        type: jsxElement.type,
        props: jsxElement.props,
        effects: [],
        effectTag: 'update',
        tag: getTag(jsxElement),
        return: returnFiber,
        alternate
      }

      if (jsxElement.type === alternate.type) {
        // 类型相同: 复用旧节点
        newFiber.stateNode = alternate.stateNode
      } else {
        // 类型不同
        newFiber.stateNode = createStateNode(newFiber)
      }
    } else if (!jsxElement && alternate) {
      alternate.effectTag = 'delete'
      returnFiber.effects.push(alternate)
    }

    if (index === 0) {
      returnFiber.child = newFiber
    } else if (jsxElement) {
      prevFiber.siling = newFiber
    }

    // 更新alternate
    if (alternate && alternate.siling) {
      alternate = alternate.siling
    } else {
      alternate = null
    }

    prevFiber = newFiber
    index++
  }
}

// 执行任务, 返回新任务
// 构建子级fiber
function executeTask(returnFiber) {
  // 构建子级fiber
  if (returnFiber.tag === 'class_component') {
    // 更新state
    if (
      returnFiber.stateNode.__fiber
      && returnFiber.stateNode.__fiber.partialState
    ) {
      returnFiber.stateNode.state = {
        ...returnFiber.stateNode.state,
        ...returnFiber.stateNode.__fiber.partialState
      }
    }

    reconcileChildren(returnFiber, returnFiber.stateNode.render())
  } else if (returnFiber.tag === 'function_component') {
    reconcileChildren(returnFiber, returnFiber.stateNode(returnFiber.props))
  } else {
    reconcileChildren(returnFiber, returnFiber.props.children)
  }

  // 如果有大儿子, 优先处理大儿子
  if (returnFiber.child) {
    return returnFiber.child
  }

  let currentExcuteFiber = returnFiber

  while (currentExcuteFiber.return) {
    // 将自己合并到当前effects
    currentExcuteFiber.effects = [
      ...currentExcuteFiber.effects,
      currentExcuteFiber
    ]

    // 将当前effects合并到父级
    currentExcuteFiber.return.effects = [
      ...currentExcuteFiber.return.effects,
      ...currentExcuteFiber.effects
    ]

    // 如果有同级, 处理兄弟节点
    if (currentExcuteFiber.siling) {
      return currentExcuteFiber.siling
    }

    // 如果没有同级, 回退到父级, 找父级的兄弟节点
    currentExcuteFiber = currentExcuteFiber.return
  }

  // 根节点
  pendingCommit = currentExcuteFiber
}

// 循环执行任务
function workLoop(deadline) {
  if (!subTask) {
    subTask = getFirstTask()
  }

  while (subTask && deadline.timeRemaining() > 1) {
    // 如果有子任务, 且还有剩余事件就执行任务
    subTask = executeTask(subTask)
  }

  // 走到这里就协调器任务完成
  // 开始把渲染页面
  if (pendingCommit) {
    commitAllWork(pendingCommit)
  }
}

// 执行任务
function preformTask(deadline) {
  // 执行任务
  workLoop(deadline)

  // 判断是否还有任务
  if (subTask || !taskQueue.isEmpty()) {
    // 请求浏览器空闲时执行
    requestIdleCallback(preformTask)
  }
}

export function render(jsxElement, rootContainer) {
  // 往任务队列添加任务
  taskQueue.push({
    dom: rootContainer,
    props: {
      children: jsxElement
    }
  })

  requestIdleCallback(preformTask)
}

export function scheduleUpdate(instance, partialState) {
  // 添加任务
  taskQueue.push({
    from: 'class_component',
    instance,
    partialState
  })
  requestIdleCallback(preformTask)
}
```

