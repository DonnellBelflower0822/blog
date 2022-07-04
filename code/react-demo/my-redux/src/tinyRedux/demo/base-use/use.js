import { createStore, bindActionCreators } from '../../src/index.js'
const initalState = { count: 0 }
// 创建reducer.在这里进行state的初始化
function rootReducer(state = initalState, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 }
    case 'DESC':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function echancer(_createStore) {
  return (reducer, preloadState) => {
    const store = _createStore(reducer, preloadState)
    const { dispatch } = store
    const _dispatch = (action) => {
      if (typeof action === 'function') {
        return action(dispatch)
      }
      dispatch(action)
    }
    return {
      ...store,
      dispatch: _dispatch
    }
  }
}

// 创建store
const store = createStore(rootReducer, undefined, echancer)

// 获取state
console.log(store.getState())

// 订阅:store更新
store.subscribe(() => {
  document.getElementById('count').innerHTML = store.getState().count
})

// 触发action
const add = () => ({ type: 'ADD' })
const desc = () => ({ type: 'DESC' })

const actions = bindActionCreators({
  add,
  desc
}, store.dispatch)

const addBtn = document.getElementById('add')
addBtn.onclick = () => {
  // 派发dispatch
  store.dispatch(() => {
    setTimeout(() => {
      // dispatch({type:"ADD"})
      actions.add()
    }, 1000)
  })
}
const descBtn = document.getElementById('desc')
descBtn.onclick = () => {
  // 派发dispatch
  // store.dispatch({type:"DESC})
  actions.desc()
}
console.log(actions)
