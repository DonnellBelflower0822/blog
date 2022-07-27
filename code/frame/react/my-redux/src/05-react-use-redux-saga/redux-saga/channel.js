function createChannel() {
    let currentTakers = []
    function take(actionType, taker) {
        taker.actionType = actionType

        taker.cancel = () => {
            currentTakers = currentTakers.filter(itemTaker => itemTaker !== taker)
        }

        currentTakers.push(taker)
    }

    function put(action) {
        currentTakers.forEach(taker => {
            if (taker.actionType === action.type) {
                taker.cancel?.()
                taker(action)
            }
        })
    }

    return { take, put }
}

export default createChannel