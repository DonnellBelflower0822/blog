import { takeEvery, put, delay } from 'redux-saga/effects'
import { ADD_SYNC } from '../actions-type'
import { add } from '../actions/couter'

function* add_sync_fn() {
  yield delay(1000)
  yield put(add(10))
}

export default function* postSaga() {
  yield takeEvery(ADD_SYNC, add_sync_fn)
}