import { createTaskQueue, arrified, createStateNode, getTag } from '../utils'

let subTask = null
const taskQueue = createTaskQueue()

// 获取第一个任务
function getFirstTask() {
  // 获取任务
  const task = taskQueue.pop()
  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null
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
}

// 执行任务
function executeTask(fiber) {
  reconcileChildren(fiber, fiber.props.children)

  if (fiber.child) {
    return fiber.child
  }
  console.log(fiber)
}

function reconcileChildren(fiber, children) {
  const childrenArr = arrified(children)
  let index = 0
  let length = childrenArr.length
  let prevFiber

  while (index < length) {
    const element = childrenArr[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTags: 'placement',
      parent: fiber,
      stateNode: null
    }

    newFiber.stateNode = createStateNode(newFiber)

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
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
  if (subTask || taskQueue.isEmpty()) {
    // 在浏览器空闲时执行任务
    requestIdleCallback(preformTask)
  }
}

// 构建fiber
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