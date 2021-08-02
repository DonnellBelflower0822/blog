export default function createChannel() {
  let currentTakers = []

  /**
   * 开始监听某个动作
   * @param {*} actionType 动作类型
   * @param {*} taker 下一个next
   */
  function take(actionType, taker) {
    taker.actionType = actionType
    taker.cancel = () => {
      currentTakers = currentTakers.filter(item => item !== taker)
    }
    currentTakers.push(taker)
  }

  // 触发takers数组中的函数执行, 动作类型一样的情况下
  function put(action) {
    currentTakers.forEach(taker => {
      if (taker.actionType === action.type) {
        taker(action)
      }
    })
  }

  return { take, put }
}