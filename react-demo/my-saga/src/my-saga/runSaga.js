import { PUT, TAKE } from './effectType'
export default function runSaga(env, saga) {
  const { dispatch, channel } = env
  const it = saga()
  function next(value) {
    const { value: effect, done } = it.next(value)
    if (!done) {
      switch (effect.type) {
        case TAKE:
          channel.take(effect.actionType, next)
          break
        case PUT:
          dispatch(effect.action)
          next()
          break
        default:
          break
      }
    }
  }
  next()
}