import { applyMiddleware, createStore } from "../../core/redux"
import rootReducer from "./reducer"

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

const store = createStore(rootReducer, {}, applyMiddleware(logger, thunk, promise))

export default store

function compose(...fns) {
    return fns.reduce((lastFn, currentFn) => {
        return (...args) => {
            return currentFn(lastFn(...args))
        }
    })
}