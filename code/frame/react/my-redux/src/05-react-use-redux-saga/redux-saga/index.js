import runSaga from './runSaga'
import createChannel from './channel'

const createSagaMiddleware = () => {
    const channel = createChannel()

    let boundRunSaga
    const sagaMiddleware = ({ getState, dispatch }) => {
        const env = { getState, dispatch, channel }
        boundRunSaga = runSaga.bind(null, env)
        return (next) => {
            return action => {
                // 拦截
                const result = next(action)

                channel.put(action)

                return result
            }
        }
    }

    sagaMiddleware.run = (saga) => {
        boundRunSaga(saga)
    }

    return sagaMiddleware
}

export default createSagaMiddleware
