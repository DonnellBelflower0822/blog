import { updateQueue } from "./Updater"

/**
 * 给真实DOM绑定事件
 * 为什么要合成事件
 * 1. 处理事件兼容性
 * 2. 可以在事件前和后做一些事情
 * @param {*} dom 
 * @param {*} eventType 
 * @param {*} handler 
 */
export default function addEvent(dom, eventType, handler) {
    if (!dom.store) {
        dom.store = {}
    }
    dom.store[eventType] = handler

    if (!document[eventType]) {
        document[eventType] = dispatchEvent
    }
}

// 合成事件
let syntheticEvent = {}

function dispatchEvent(event) {
    // 进入批量更新模式
    updateQueue.isBatchingUpdate = true

    let { target, type } = event
    const eventType = `on${type}`

    createSyntheticEvent(event)

    while (target) {
        const listener = target.store?.[eventType]
        if (listener) {
            listener.call(undefined, syntheticEvent)
        }
        target = target.parentNode
    }

    clearSyntheticEvent()
    updateQueue.batchUpdate()
}

function createSyntheticEvent(event) {
    for (const key in event) {
        syntheticEvent[key] = event[key]
    }
}

function clearSyntheticEvent() {
    for (const key in syntheticEvent) {
        syntheticEvent[key] = null
    }
}