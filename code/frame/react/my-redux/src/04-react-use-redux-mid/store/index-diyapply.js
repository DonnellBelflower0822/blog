import { createStore } from "../redux"
import rootReducer from "./reducer"

// const store = createStore(rootReducer)

// const dispatch = store.dispatch

// 日志
// store.dispatch = (action) => {
//     console.log('prev state', store.getState())
//     dispatch(action)
//     console.log('next state', store.getState())
// }

// thunk
// store.dispatch = (action) => {
//     setTimeout(() => {
//         dispatch(action)
//     }, 1000)
// }

function applyMiddleware(...middlewares) {
    return (createStore) => {
        return (reducer) => {
            const store = createStore(reducer)
            let dispatch
            const middlewareAPI = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            }

            const chains = middlewares.map(middleware => middleware(middlewareAPI))

            // const [promise, thunk, logger] = chains
            // // 形成dispatch
            // dispatch = promise(thunk(logger(store.dispatch)))

            // dispatch = middleware(middlewareAPI)(store.dispatch)

            dispatch = compose(...chains)(store.dispatch)

            return {
                ...store,
                dispatch: (action) => {
                    dispatch(action)
                }
            }
        }
    }
}

function logger({ getState }) {
    return function loggerNext(next) {
        return function loggerDispatch(action) {
            console.log('prev state', getState())
            next(action)
            console.log('next state', getState())
        }
    }
}

function thunk({ dispatch, getState }) {
    return function thunkNext(next) {
        return function thunkDispatch(action) {
            if (typeof action === 'function') {
                return action(dispatch, getState)
            }
            return next(action)
        }
    }
}

function promise({ dispatch }) {
    return function promiseNext(next) {
        return function promiseDispatch(action) {
            if (typeof action?.then === 'function') {
                return action.then(data => dispatch(data))
            }
            return next(action)
        }
    }
}

const store = applyMiddleware(promise, thunk, logger)(createStore)(rootReducer)

export default store

// const [promise, thunk, logger] = chains
// promise(thunk(logger()))

// function compose(...fns) {
//     return function (args) {
//         return fns.reduceRight((args, currentFn) => {
//             return currentFn(args)
//         }, args)
//     }
// }

// const [promise, thunk, logger] = chains
// promise(thunk(logger()))

function compose(...fns) {
    return fns.reduce((lastFn, currentFn) => {
        return (...args) => {
            return currentFn(lastFn(...args))
        }
    })
}