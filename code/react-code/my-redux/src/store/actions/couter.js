import { createAction } from 'redux-actions'

import { ADD_SYNC, DESC } from '../actions-type'

export const add = createAction('add')

// export const add = (payload) => ({ type: ADD, payload })
export const desc = (payload) => ({ type: DESC, payload })

// export const add_sync = (playload) => dispatch => {
//   setTimeout(() => {
//     dispatch(add(playload))
//   }, 1000);
// }

// 触发saga的action
// 接收参数
export const add_sync = (payload) => ({ type: ADD_SYNC, payload })