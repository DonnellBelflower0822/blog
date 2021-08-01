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
  // 返回最外层的fiber对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: "HOST_ROOT",
    effects: [],
    return: null,
    child: null
  }
}

function reconcileChildren(returnFiber, jsxElementChildren) {
  
}

// 执行任务, 返回新任务
// 构建子级fiber
function executeTask(returnFiber) {
  reconcileChildren(returnFiber, returnFiber.props.children)
}

// 循环执行任务
function workLoop(deadline) {
  if (!subTask) {
    subTask = getFirstTask()
  }

  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask)
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