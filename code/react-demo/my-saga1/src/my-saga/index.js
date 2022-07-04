import createChannel from './channel'
import { runSaga } from './runSaga'

function createSagaMiddleware() {
  let boundRunSaga
  const channel = createChannel()
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, { getState, dispatch, channel })
    return next => {
      return action => {
        next(action)
        // 在这里拦截
        channel.put(action)
      }
    }
  }

  sagaMiddleware.run = (saga) => {
    boundRunSaga(saga)
  }

  return sagaMiddleware
}

export default createSagaMiddleware