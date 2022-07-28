function logger(middlewareAPI) {
    return function loggerNext(next) {
        return function loggerDispatch(action) {
            console.log('prev state', middlewareAPI.getState())
            next(action)
            console.log('next state', middlewareAPI.getState())
        }
    }
}

function thunk(middlewareAPI) {
    return function thunkNext(next) {
        return function thunkDispatch(action) {
            if (typeof action === 'function') {
                return action(middlewareAPI.dispatch, middlewareAPI.getState)
            }
            return next(action)
        }
    }
}

function promise(middlewareAPI) {
    return function promiseNext(next) {
        return function promiseDispatch(action) {
            if (typeof action?.then === 'function') {
                return action.then(data => middlewareAPI.dispatch(data))
            }
            return next(action)
        }
    }
}

// dispatch => loggerNext(thunkNext(promiseNext(dispatch)))

const middlewares = [logger, thunk, promise]

const middlewareAPI = {
    getState: store.getState,
    dispatch: action => dispatch(action)
}
const chains = middlewares.map(middleware => middleware(middlewareAPI))

chains = [
    loggerNext,
    thunkNext,
    promiseNext
]

const composeChains = compose(...chains)
function compose(...fns) {
    return fns.reduce((lastFn, currentFn) => {
        return (...args) => {
            return currentFn(lastFn(...args))
        }
    })
}

// part1 
lastFn = (...args) => {
    loggerNext(thunkNext(...args))
}

composeChains = (...args) => {
    // promiseNext(((...innerArgs) => {
    //     )
    // })(...args))
}

// 获取处理过的dispatch
dispatch = (store.dispatch)
