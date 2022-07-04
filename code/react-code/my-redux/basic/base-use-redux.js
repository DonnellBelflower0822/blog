import '../node_modules/redux/dist/redux.js'

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

// 创建store
const store = Redux.createStore(rootReducer)

// 获取state
console.log(store.getState())

// 订阅:store更新
store.subscribe(() => {
  document.getElementById('count').innerHTML = store.getState().count
})

// 触发action
const addAction = { type: 'ADD' }
const addBtn = document.getElementById('add')
addBtn.onclick = () => {
  // 派发dispatch
  store.dispatch(addAction)
}
const descBtn = document.getElementById('desc')
const descAction = { type: 'DESC' }
descBtn.onclick = () => {
  // 派发dispatch
  store.dispatch(descAction)
}
