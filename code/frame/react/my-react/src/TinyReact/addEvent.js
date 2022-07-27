import { updateQueue } from "./Updater"

/**
 * 给真实DOM绑定事件
 * 为什么要合成事件
 * 1. 处理事件兼容性
 * 2. 可以在事件处理函数前后做额外操作
 * @param {*} dom 
 * @param {*} eventType 
 * @param {*} handler 
 */
export default function addEvent(dom, eventType, handler) {
    if (!dom.store) {
        dom.store = {}
    }
    // 方便冒泡是从dom身上获取事件处理函数
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

    // 模拟事件冒泡
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

// 生成新的合成事件对象
function createSyntheticEvent(event) {
    for (const key in event) {
        syntheticEvent[key] = event[key]
    }
}

// 清除合成事件对象
function clearSyntheticEvent() {
    for (const key in syntheticEvent) {
        syntheticEvent[key] = null
    }
}