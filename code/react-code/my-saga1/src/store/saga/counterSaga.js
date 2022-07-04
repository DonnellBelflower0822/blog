import { delay, put, takeEvery } from 'redux-saga/effects';
import { COUNT_ADD, COUNT_ADD_ASYNC } from '../action-types';

function* addAsync() {
  yield delay(1000)
  // 派发dispatch(action)
  yield put({ type: COUNT_ADD })
}

export default function* counter() {
  yield takeEvery(COUNT_ADD_ASYNC, addAsync)
}