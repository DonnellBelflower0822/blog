export class Update {
    constructor (payload) {
        this.payload = payload
        this.nextUpdater = null
    }
}

export class UpdateQueue {
    constructor (isUseState = false) {
        this.firstUpdate = null
        this.lastUpdate = null

        this.isUseState = isUseState
    }

    equeueUpdate(update) {
        if (!this.lastUpdate) {
            this.firstUpdate = this.lastUpdate = update
        } else {
            // this.lastUpdate  => 上一个更新
            this.lastUpdate.nextUpdater = update
            this.lastUpdate = update
        }
    }

    forceUpdate(state) {
        let currentUpdate = this.firstUpdate
        while (currentUpdate) {
            const nextState = typeof currentUpdate.payload === 'function'
                ? currentUpdate.payload(state)
                : currentUpdate.payload
            
            state = !this.isUseState ? { ...state, ...nextState } : nextState
            currentUpdate = currentUpdate.nextUpdater
        }

        this.firstUpdate = this.lastUpdate = null

        return state
    }

}