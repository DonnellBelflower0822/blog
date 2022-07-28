export const applyMiddleware = (...middlewares) => {
    return (createStore) => {
        return (reducer, initialState) => {
            const store = createStore(reducer, initialState)

            let dispatch

            // 创建中间件api
            const middlewareAPI = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            }

            // 包裹middlewareAPI
            const chains = middlewares.map(middleware => middleware(middlewareAPI))
            // 获取处理过的dispatch

            const composeChains = compose(...chains)
            dispatch = composeChains(store.dispatch)

            // console.log(dispatch)

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