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
