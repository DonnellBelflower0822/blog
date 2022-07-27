import { take, put } from '../redux-saga/effects'
import { ADD1, ASYNC_ADD1 } from '../store/action-type'

function* rootSaga() {
    console.log('启动saga')

    for (let i = 0; i < 3; i += 1) {
        console.log(0)
        yield take(ASYNC_ADD1)
        console.log(1)
        yield put({ type: ADD1 })
        console.log(2)
    }
}

export default rootSaga