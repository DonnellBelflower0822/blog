// 创建任务队列: 先进先出
function createTaskQueue() {
  const taskQueue = []
  return {
    push: item => taskQueue.push(item),
    pop: () => {
      return taskQueue.shift()
    },
    // 判断是否还有任务
    isEmpty: () => taskQueue.length === 0
  }
}

export default createTaskQueue()
