export class Update {
    constructor (payload) {
        this.payload = payload
        this.nextUpdater = null
    }
}

export class UpdateQueue {
    constructor () {
        this.firstUpdate = null
        this.lastUpdate = null
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

            state = { ...state, ...nextState }
            currentUpdate = currentUpdate.nextUpdater
        }

        this.firstUpdate = this.lastUpdate = null

        return state
    }

}