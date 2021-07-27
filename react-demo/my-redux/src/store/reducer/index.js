import { combineReducers } from 'redux'
import counterReducer from './counter'
import modalReducer from './modal'
// state = {counter:{count:0},modal:{visible}}
export default combineReducers({
  counter: counterReducer,
  modal: modalReducer,
})