import { applyMiddleware, createStore } from "../redux"
import rootReducer from "./reducer"


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

// const store = applyMiddleware(promise, thunk, logger)(createStore)(rootReducer)
const store = createStore(rootReducer, {}, applyMiddleware(promise, thunk, logger))

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