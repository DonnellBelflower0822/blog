// 更新队列
export const updateQueue = {
    // 是否存于批量更新模式
    isBatchingUpdate: false,
    updater: new Set(),
    batchUpdate() {
        for (const updater of this.updater) {
            updater.updateClassComponent()
        }
        this.updater.clear()
        this.isBatchingUpdate = false
    }
}

class Updater {
    constructor (classInstance) {
        this.classInstance = classInstance
        // 等待更新的状态
        this.pendingState = []
        // 状态更新后的回调
        this.callbacks = []
    }

    addState(partialState, cb) {
        this.pendingState.push(partialState)
        if (typeof cb === 'function') {
            this.callbacks.push(cb)
        }
        this.emitUpdate()
    }

    emitUpdate(newProps) {
        this.newProps = newProps

        // 处于批量更新模式
        if (updateQueue.isBatchingUpdate) {
            updateQueue.updater.add(this)
        }
        // 处于非批量更新模式
        else {
            this.updateClassComponent()
        }
    }

    // 获取新的state
    getState() {
        const { pendingState, classInstance } = this
        const { state: oldState } = classInstance

        let state = oldState
        pendingState.forEach(nextState => {
            if (typeof nextState === 'function') {
                nextState = nextState.call(classInstance, state)
            }
            state = { ...state, ...nextState }
        })

        pendingState.length = 0

        return state
    }

    updateClassComponent() {
        const { pendingState, classInstance, callbacks, newProps } = this

        if (newProps || pendingState.length > 0) {
            shouldComponentUpdate(classInstance, newProps, this.getState(), callbacks)
        }
    }
}

// 组件是否更新
function shouldComponentUpdate(classInstance, newProps, nextState, callbacks) {
    // 处理 static getDerivedStateFromProps生命周期
    const { ownType: ClassComponent } = classInstance
    if (ClassComponent.getDerivedStateFromProps) {
        classInstance.state = {
            ...classInstance.state,
            ...ClassComponent.getDerivedStateFromProps(newProps, classInstance.state)
        }
    }

    // 处理shouldComponentUpdate生命周期
    if (
        classInstance.shouldComponentUpdate
        && !classInstance.shouldComponentUpdate(newProps, nextState)
    ) {
        classInstance.state = nextState
        if (newProps) {
            classInstance.props = newProps
        }
        callbacks.length = 0
        return
    }

    classInstance.state = nextState

    if (newProps) {
        classInstance.props = newProps
    }
    classInstance.forceUpdate()
    callbacks.forEach(callback => callback())
    callbacks.length = 0
}

export default Updater