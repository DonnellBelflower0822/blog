import { ADD } from '../action-types'

const initailState = {
  count: 0
}

export default function counterReducer(state = initailState, action) {
  // 只处理同步更新
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}