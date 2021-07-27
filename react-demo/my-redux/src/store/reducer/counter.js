import { ADD, DESC } from '../actions-type'

const initalState = { count: 0 }
export default function reducer(state = initalState, action) {
  const { payload = 1 } = action
  switch (action.type) {
    case ADD:
      return { count: state.count + payload }
    case DESC:
      return { count: state.count - payload }
    default:
      return state
  }
}