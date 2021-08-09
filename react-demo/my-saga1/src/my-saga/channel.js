export default function createChannel() {
  // 当前箭头者
  const currentTakers = []

  /**
   * 监听
   * @param {string} actionType 监听动作类型
   * @param {*} taker 
   */
  function take(actionType, taker) {
    taker.actionType = actionType
    // 干掉
    taker.cancel = () => {
      const index = currentTakers.findIndex(taker)
      currentTakers.splice(index, 1)
    }
    currentTakers.push(taker)
  }

  /**
   * 触发动作
   * @param {*} action 动作对象 {type:string,payload:any}
   */
  function put(action) {
    currentTakers.forEach(taker => {
      if (taker.actionType === action.type) {
        // 干掉, 只执行一次
        taker.cancel()
        taker(action)
      }
    })
  }

  return {
    take,
    put
  }
}