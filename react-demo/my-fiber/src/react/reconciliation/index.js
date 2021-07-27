import { taskQueue, arrified, createStateNode, getTag, updateNodeElement, getRoot } from '../utils'

let pendingCommit = null

function commitAllWork(rootFiber) {
  rootFiber.effects.forEach(item => {
    if (item.tag === 'class_component') {
      item.stateNode.__fiber = item
    }

    if (item.effectTags === 'delete') {
      // 删除操作
      item.parent.stateNode.removeChild(item.stateNode)
    }
    else if (item.effectTags === 'update') {
      // 更新
      if (item.type === item.alternate.type) {
        // 节点类型相同
        updateNodeElement(
          item.stateNode,
          item,
          item.alternate
        )
      } else {
        // 节点类型不同
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        )
      }
    } else if (item.effectTags === "placement") {
      // 挂载
      let currentFiber = item
      let parentFiber = item.parent

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent
      }

      if (currentFiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(currentFiber.stateNode)
      }
    }
  })

  // 备份旧的fiber节点对象到真实dom身上
  rootFiber.stateNode.__rootFiberContainer = rootFiber
}

// 要执行的子任务
let subTask = null

// 获取第一个任务
function getFirstTask() {
  // 获取任务
  const task = taskQueue.pop()

  if (task.from === 'class_component') {
    // 组件状态更新
    const rootFiber = getRoot(task.instance)

    task.instance.__fiber.partialState = task.partialState

    return {
      props: rootFiber.props,
      stateNode: rootFiber.stateNode,
      tag: "host_root",
      effects: [],
      child: null,
      // 旧的fiber
      alternate: rootFiber
    }
  }

  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null,
    // 旧的fiber
    alternate: task.dom.__rootFiberContainer
  }
}

function workLoop(deadline) {
  // 如果子任务不存在,就获取子任务
  if (!subTask) {
    subTask = getFirstTask()
  }

  // 如果有任务,且浏览器还有空余时间就执行
  while (subTask && deadline.timeRemaining() > 1) {
    // 执行任务, 接收任务, 返回任务
    subTask = executeTask(subTask)
  }

  // 如有有pendingCommit就证明已经构建完成
  if (pendingCommit) {
    // 开始commit
    commitAllWork(pendingCommit)
  }
}

/**
 * 执行任务: 
 *    构建子级children的fiber
 *    不考虑孙子级
 * 返回值:
 *    如果有大儿子child就返回大儿子
 *    如果没有大儿子
 *      返回父亲的兄弟
 *      如果没有父亲的兄弟就递归爷爷的兄弟
 * @param {*} fiber 
 * @returns 
 */
function executeTask(fiber) {
  // 只构建当前fiber的第一层子fiber
  if (fiber.tag === 'class_component') {
    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState
      }
    }

    reconcileChildren(fiber, fiber.stateNode.render())
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    reconcileChildren(fiber, fiber.props.children)
  }

  // 如果有大儿子,则优先递归大儿子
  if (fiber.child) {
    return fiber.child
  }

  // 走到这里就到头了.需要往上回去
  let currentExecutelyFiber = fiber

  while (currentExecutelyFiber.parent) {
    // 记录当前effect
    currentExecutelyFiber.parent.effects = (
      currentExecutelyFiber.parent.effects.concat(
        currentExecutelyFiber.effects.concat([currentExecutelyFiber])
      )
    )
    
    // 返回兄弟节点
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling
    }

    // 指向父亲
    currentExecutelyFiber = currentExecutelyFiber.parent
  }

  // 到这里的化就是
  pendingCommit = currentExecutelyFiber
}

// 构建子节点fiber
function reconcileChildren(fiber, children) {
  const childrenArr = arrified(children)
  let index = 0
  let length = childrenArr.length
  let prevFiber = null
  let alternate = null

  if (fiber.alternate && fiber.alternate.child) {
    // 有备份子节点
    alternate = fiber.alternate.child
  }

  let newFiber = null
  while (index < length || alternate) {
    const element = childrenArr[index]

    if (!element && alternate) {
      // 删除
      alternate.effectTags = 'delete'
      fiber.effects.push(alternate)
    } else if (element && alternate) {
      // 更新
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTags: 'update',
        parent: fiber,
        stateNode: null,
        alternate
      }

      if (element.type === alternate.type) {
        // 类型相同: 复用
        newFiber.stateNode = alternate.stateNode
      } else {
        // 类型不同
        newFiber.stateNode = createStateNode(newFiber)
      }
    } else {
      // 挂载
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTags: 'placement',
        parent: fiber,
        stateNode: null
      }

      newFiber.stateNode = createStateNode(newFiber)
    }

    if (index === 0) {
      fiber.child = newFiber
    } else if (element) {
      prevFiber.sibling = newFiber
    }

    // 备份节点有兄弟节点
    if (alternate && alternate.sibling) {
      alternate = alternate.sibling
    } else {
      alternate = null
    }

    prevFiber = newFiber

    index++
  }
}

function preformTask(deadline) {
  // 执行任务
  workLoop(deadline)
  // 判断任务是否存在
  // 判断任务队列是否还有未执行的任务
  if (subTask || !taskQueue.isEmpty()) {
    // 在浏览器空闲时执行任务
    requestIdleCallback(preformTask)
  }
}

// 构建根的fiber
export function render(element, dom) {
  // 往任务队列添加任务
  taskQueue.push({
    dom,
    props: {
      children: element
    }
  })

  // 在浏览器空闲时执行任务
  requestIdleCallback(preformTask)
}

export function scheduleUpdate(instance, partialState) {
  taskQueue.push({
    from: 'class_component',
    instance,
    partialState
  })

  // 在浏览器空闲时执行任务
  requestIdleCallback(preformTask)
}