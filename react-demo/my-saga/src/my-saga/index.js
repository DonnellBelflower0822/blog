import createChannel from './channel'
import runSaga from './runSaga'

export default function createSagaMiddleware() {
  const channel = createChannel()
  let boundRunSaga
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, { getState, dispatch, channel })
    return (next) => {
      return action => {
        next(action)
        channel.channelPut(action)
      }
    }
  }
  sagaMiddleware.run = (saga) => boundRunSaga(saga)
  return sagaMiddleware
}
