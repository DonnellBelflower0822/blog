export function createStore(reducer, preloadState, enhancer) {
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be a function')
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer must be a function')
    }

    return enhancer(createStore)(reducer, preloadState)
  }

  let state = preloadState

  function getState() {
    return state
  }

  // 订阅数组
  const callbacks = []

  // 派发
  function dispatch(action) {
    if (
      action === null
      || typeof action !== 'object'
      || Array.isArray(action)
    ) {
      throw new Error('action must be a object')
    }

    if (action.type === undefined) {
      throw new Error('action must be has type field')
    }

    state = reducer(state, action)
    // 通知
    callbacks.forEach(cb => cb())
  }

  // 订阅
  function subscribe(callback) {
    callbacks.push(callback)
    return () => {
      const index = callbacks.indexOf(callback)
      callbacks.splice(index, 1)
    }
  }

  dispatch({ type: '@@@INIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}

export const applyMiddleware = (...middlewares) => {
  return (createStore) => {
    return (reducer, preloadState) => {
      const store = createStore(reducer, preloadState)
      const middlewareApi = {
        getState: store.store,
        dispatch: store.dispatch
      }

      // 先执行中间件的第一层, 先让中间件缓存store
      // (store) => ((next) => (action) => {})
      const chain = middlewares.map(middleware => middleware(middlewareApi))
      const _dispatch = compose(...chain)(store.dispatch)

      return { ...store, dispatch: _dispatch }
    }
  }
}

// 举例: applyMiddleware(logger, thunk)
// const chain = middlewares.map(middleware => middleware(middlewareApi))
// chain = [
//    logger: (next) => (action) => {}, 
//    thunk: (next) => (action) => {}
// ]
// compose(已经执行过第一层的中间件)(真正的dispatch)
// const _dispatch = compose(...chain)(store.dispatch)
/**
logger: (next ==> thunk) => (action) => {}
thunk: (next ==> store.dispatch) => (action) => {}
 */
function compose(...chains) {
  // return (dispatch) => {
  //   // console.log(chains, dispatch)
  //   // chains.reduceRight()
  //   for (let i = chains.length - 1;i >= 0;i--) {
  //     dispatch = chains[i](dispatch)
  //   }

  //   return dispatch
  // }

  return dispatch => {
    return chains.reduceRight((next, chain) => {
      return chain(next)
    }, dispatch)
  }
}

export function bindActionCreators(actionCreators, dispatch) {
  const boundActions = {}
  Object.keys(actionCreators).forEach(key => {
    boundActions[key] = (payload) => {
      dispatch(actionCreators[key](payload))
    }
  })
  return boundActions
}

export function combineReducers(reducers) {
  const reducersKey = Object.keys(reducers)
  return (state, action) => {
    const nextState = {}
    reducersKey.forEach(key => {
      nextState[key] = reducers[key](state[key], action)
    })

    return nextState
  }
}