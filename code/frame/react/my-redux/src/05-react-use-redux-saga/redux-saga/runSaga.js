import { ALL, CALL, CPS, FORK, PUT, TAKE } from './effectTypes'
function runSaga(env, saga, doneCallback) {
    const { getState, dispatch, channel } = env

    // saga可能是迭代器, 也可能是生成器
    const it = typeof saga === 'function' ? saga() : saga

    function next(value, isError) {
        let result
        if (isError) {
            result = it.throw(value)
        } else {
            result = it.next(value)
        }

        if (!result.done) {
            // 迭代器
            if (typeof result.value[Symbol.iterator] === 'function') {
                const newIt = result.value
                // 开启新的子进程
                runSaga(env, newIt)
                // 不阻塞
                next()
            }
            // promise
            else if (typeof result.value.then === 'function') {
                // 需要阻塞
                result.value.then(next)
            }
            else {
                switch (result.value.type) {
                    case TAKE:
                        // 订阅动作
                        // 等待动作发生, 等不到就一直等, 阻塞
                        channel.take(result.value.actionType, next)
                        break
                    case PUT:
                        // 不会阻塞saga执行
                        dispatch(result.value.action)
                        next()
                        break
                    case FORK:
                        // 开启新的子进程执行saga
                        runSaga(env, result.value.saga)
                        next()
                        break
                    case CALL:
                        result.value.fn(...result.value.args).then(next)
                        break
                    case CPS:
                        result.value.fn(...result.value.args, (error, ...newArgs) => {
                            if (!error) {
                                next.apply(null, newArgs)
                            } else {
                                next(error, true)
                            }
                        })
                        break
                    case ALL:
                        const effects = result.value.effects
                        const result = []
                        let completeCount = 0

                        effects.forEach((effect, index) => {
                            runSaga(env, effect, (ret) => {
                                completeCount += 1
                                result[index] = ret
                                if (completeCount === effects.length) {
                                    next(result)
                                }
                            })
                        })

                        break
                    default:
                        break
                }
            }
        } else {
            doneCallback?.(result.value)
        }
    }

    next()
}

export default runSaga