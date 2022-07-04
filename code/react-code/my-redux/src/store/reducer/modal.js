import { TOGGLE } from '../actions-type'

const initalState = { visible: false }
export default function reducer(state = initalState, action) {
  switch (action.type) {
    case TOGGLE:
      return { ...state, visible: !state.visible }
    default:
      return state
  }
}