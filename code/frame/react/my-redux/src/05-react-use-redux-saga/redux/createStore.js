export function createStore(reducer, initialState, enhancer) {
    if (typeof enhancer === 'function') {
        return enhancer(createStore)(reducer, initialState)
    }

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
        return () => {
            listeners.delete(listener)
        }
    }

    const store = {
        getState() {
            return state
        },
        dispatch,
        subscribe
    }

    dispatch({ type: '@@REDUX/INIT' })

    return store
}
