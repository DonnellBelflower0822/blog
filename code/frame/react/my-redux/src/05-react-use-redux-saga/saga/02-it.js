import { take, put } from '../redux-saga/effects'
import { ADD1, ASYNC_ADD1 } from '../store/action-type'

function* add() {
    yield put({ type: ADD1 })
    console.log('add next')
}

function* rootSaga() {
    console.log('启动saga')

    for (let i = 0; i < 3; i += 1) {
        yield take(ASYNC_ADD1)
        yield add()
        console.log('rootsaga next')
    }
}

export default rootSaga