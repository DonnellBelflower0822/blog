import { takeEvery, put, delay } from 'redux-saga/effects'
import { TOGGLE_SYNC } from '../actions-type'
import { toggle } from '../actions/modal'

function* toggle_sync_fn() {
  yield delay(500)
  yield put(toggle())
}

export default function* modalSaga() {
  yield takeEvery(TOGGLE_SYNC, toggle_sync_fn)
}