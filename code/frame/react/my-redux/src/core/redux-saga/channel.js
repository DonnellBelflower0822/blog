function createChannel() {
    let currentTakers = []
    
    // 订阅动作
    function subscribe(actionType, callback) {
        callback.actionType = actionType

        callback.cancel = () => {
            currentTakers = currentTakers.filter(itemTaker => itemTaker !== callback)
        }

        currentTakers.push(callback)
    }

    function publication(action) {
        currentTakers.forEach(taker => {
            if (taker.actionType === action.type) {
                taker.cancel?.()
                taker(action)
            }
        })
    }

    return { subscribe, publication }
}

export default createChannel