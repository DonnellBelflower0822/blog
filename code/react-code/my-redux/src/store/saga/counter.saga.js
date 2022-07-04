import { takeEvery, put, delay } from 'redux-saga/effects'
import { ADD_SYNC } from '../actions-type'
import { add } from '../actions/couter'

// 处理函数的第一个参数为action
function* add_sync_fn(action) {
  // 延迟
  yield delay(1000)
  // 调用add的reducer
  yield put(add(action.payload))
}

export default function* counterSaga() {
  // 接收action
  // action的type
  // 执行方法
  yield takeEvery(ADD_SYNC, add_sync_fn)
}