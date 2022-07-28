import { put, takeEvery, cps, all } from '../../core/redux-saga/effects'
import { ADD1, ASYNC_ADD1 } from '../store/action-type'

const delay = (ms, callback) => {
    setTimeout(() => {
        callback(null)
    }, ms)
}

function* add1() {
    yield cps(delay, 1000)
    yield put({ type: ADD1 })
}

function* watcherSaga() {
    yield takeEvery(ASYNC_ADD1, add1)
}

function* rootSaga() {
    const result = yield all([watcherSaga])
}

export default rootSaga