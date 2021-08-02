import { take, put, delay } from 'redux-saga/effects'
import { ADD, ADD_SYNC } from '../action-types'

function* rootSaga() {
  console.log('rootSaga')
  // 只等一次
  yield take(ADD_SYNC)
  yield delay(1000)
  yield put({ type: ADD })
}
export default rootSaga