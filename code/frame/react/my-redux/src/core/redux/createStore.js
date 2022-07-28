export function createStore(reducer, initialState, enhancer) {
    // 如果传递增强函数
    if (typeof enhancer === 'function') {
        return enhancer(createStore)(reducer, initialState)
    }

    let state = initialState

    // 订阅回调函数集合
    const listeners = new Set()

    // 派发action
    const dispatch = (action) => {
        // 计算新的状态
        state = reducer(state, action)
        // 执行订阅回调函数
        listeners.forEach(listener => listener())
    }

    // 订阅
    const subscribe = (listener) => {
        // 添加订阅
        listeners.add(listener)
        // 返回取消订阅的函数
        return () => {
            listeners.delete(listener)
        }
    }

    const store = {
        // 获取状态
        getState() {
            return state
        },
        // 派发动作
        dispatch,
        // 订阅
        subscribe
    }

    // 初始化
    dispatch({ type: '@@REDUX/INIT' })

    return store
}
