import { put, takeEvery, call } from '../redux-saga/effects'
import { ADD1, ASYNC_ADD1 } from '../store/action-type'

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function* add() {
    yield call(delay, 1000)
    yield put({ type: ADD1 })
}

function* rootSaga() {
    yield takeEvery(ASYNC_ADD1, add)
}

export default rootSaga