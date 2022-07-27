import { put, takeEvery, cps } from '../redux-saga/effects'
import { ADD1, ASYNC_ADD1 } from '../store/action-type'

const delay = (ms, callback) => {
    setTimeout(() => {
        callback(null)
    }, ms)
}

function* add() {
    yield cps(delay, 1000)
    yield put({ type: ADD1 })
}

function* rootSaga() {
    yield takeEvery(ASYNC_ADD1, add)
}

export default rootSaga