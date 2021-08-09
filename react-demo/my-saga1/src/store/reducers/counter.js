import { COUNT_ADD, COUNT_DESC } from '../action-types'

const initialState = {
  count: 0
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case COUNT_ADD:
      return { ...state, count: state.count + 1 }
    case COUNT_DESC:
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}