import runSaga from './runSaga'
import createChannel from './channel'

const createSagaMiddleware = () => {
    // 发布订阅的管道
    const channel = createChannel()

    let boundRunSaga
    const sagaMiddleware = (middlewareAPI) => {
        const { getState, dispatch } = middlewareAPI
        const env = { getState, dispatch, channel }
        
        boundRunSaga = runSaga.bind(null, env)

        return (next) => {
            return action => {
                // 拦截
                const result = next(action)

                // 发布action的动作
                channel.publication(action)

                return result
            }
        }
    }

    // 启动saga
    sagaMiddleware.run = (saga) => {
        boundRunSaga?.(saga)
    }

    return sagaMiddleware
}

export default createSagaMiddleware
