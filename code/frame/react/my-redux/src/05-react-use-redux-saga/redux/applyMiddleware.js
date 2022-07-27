export const applyMiddleware = (...middlewares) => {
    return (createStore) => {
        return (reducer, initialState) => {
            const store = createStore(reducer, initialState)

            let dispatch
            const middlewareAPI = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            }

            const chains = middlewares.map(middleware => middleware(middlewareAPI))
            // 获取处理过的dispatch
            dispatch = compose(...chains)(store.dispatch)

            return {
                ...store,
                dispatch
            }
        }
    }
}

function compose(...fns) {
    return fns.reduce((lastFn, currentFn) => {
        return (...args) => {
            return currentFn(lastFn(...args))
        }
    })
}