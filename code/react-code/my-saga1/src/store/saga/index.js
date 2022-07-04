import { put, takeEvery } from '../../my-saga/effects'
// import counterSaga from './counterSaga'
import { COUNT_ADD, COUNT_ADD_ASYNC } from '../action-types';

export default function* rootSaga() {
  // yield all([
  //   counterSaga()
  // ])

  // yield take(COUNT_ADD_ASYNC)
  // yield add()
  yield takeEvery(COUNT_ADD_ASYNC, add)
}

function* add() {
  yield put({ type: COUNT_ADD })
}