import { PUT, TAKE, FORK } from './effectType'

// import { TAKE, PUT } from './effectType'
export function runSaga(env, saga) {
  // getState,
  const { dispatch, channel } = env
  const it = saga()
  function next(value) {
    // effect: {type: "TAKE", actionType: "COUNT_ADD_ASYNC"}
    const { value: effect, done } = it.next(value)
    if (!done) {
      if (typeof effect[Symbol.iterator] === 'function') {
        runSaga(env, effect)
        next()
      } else {
        switch (effect.type) {
          case TAKE:
            channel.take(effect.actionType, next)
            break
          case PUT:
            // dispatch不阻塞
            dispatch(effect.action)
            next()
            break
          case FORK:
            // 开启新的子进程去执行saga
            runSaga(env, effect.saga)
            // 不会阻塞
            next()
            break
          default:
            break
        }
      }
    }
  }
  next()
}