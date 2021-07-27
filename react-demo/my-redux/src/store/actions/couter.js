import { ADD, DESC } from '../actions-type'

export const add = (payload) => ({ type: ADD, payload })
export const desc = (payload) => ({ type: DESC, payload })

export const add_sync = (playload) => dispatch => {
  setTimeout(() => {
    dispatch(add(playload))
  }, 1000);
}