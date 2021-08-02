import { PUT, TAKE } from './effectType'
export default function runSaga(env, saga) {
  const { getState, dispatch, channel } = env
  console.log(env, saga)
  const it = saga()
  function next(value) {
    const { value: effect, done } = it.next(value)
    if (!done) {
      switch (effect.type) {
        case TAKE:
          channel.take(effect.type, next)
          break
        case PUT:
        default:
          break
      }
    }
  }
  next()
}