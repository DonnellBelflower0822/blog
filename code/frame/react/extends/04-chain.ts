type BaseState = Record<string, unknown>
type StatePayload = object | ((prevState: object) => object)

class Updater {
    nextUpdater: Updater | null
    payload: StatePayload

    constructor(payload: StatePayload, nextUpdater: Updater | null = null) {
        this.payload = payload
        // next指针, 指向下一个更新
        this.nextUpdater = nextUpdater
    }
}

class UpdateQueue {
    baseState: null | BaseState
    firstUpdater: null | Updater
    lastUpdater: null | Updater

    constructor() {
        // 原状态
        this.baseState = null
        // 第一个更新
        this.firstUpdater = null
        // 最后一个更新
        // 作为中间值
        //      1. 上一个更新.nextUpdater指向当前更新
        //      2. 更新最后一个更新为当前值
        this.lastUpdater = null
    }

    queueUpdater(updater: Updater) {
        if (!this.firstUpdater) {
            // 第一次
            this.firstUpdater = this.lastUpdater = updater
            return
        }
        // 更新后续
        if (this.lastUpdater) {
            this.lastUpdater.nextUpdater = updater
            this.lastUpdater = updater
        }
    }

    forceUpdate() {
        let currentState = this.baseState || {}
        let currentUpdater = this.firstUpdater

        // 递归调用nextUpdater
        while (currentUpdater) {
            const nextState = typeof currentUpdater.payload === 'function'
                ? currentUpdater.payload(currentState)
                : currentUpdater.payload
            currentState = { ...currentState, ...nextState }

            currentUpdater = currentUpdater.nextUpdater
        }

        this.firstUpdater = this.lastUpdater = null
        this.baseState = currentState

        return currentState
    }
}

const queue = new UpdateQueue()
queue.queueUpdater(
    new Updater({ name: 'allen' })
)
queue.queueUpdater(
    new Updater({ age: 27 })
)
queue.queueUpdater(
    new Updater((state: { age: number }) => ({ age: state.age + 1 }))
)
queue.queueUpdater(
    new Updater((state: { age: number }) => ({ age: state.age + 1 }))
)

queue.forceUpdate()

console.log(queue.baseState)
