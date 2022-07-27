export function createStore(reducer, initialState) {
    let state = initialState
    const listeners = new Set()

    // 派发action
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    // 订阅
    const subscribe = (listener) => {
        listeners.add(listener)
    }

    const store = {
        getState() {
            return state
        },
        dispatch,
        subscribe
    }

    return store
}
