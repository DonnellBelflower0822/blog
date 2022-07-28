import { ALL, CALL, CPS, FORK, PUT, SELECT, TAKE } from './effectTypes'

function runSaga(env, saga, doneCallback) {
    const { getState, dispatch, channel } = env

    // saga可能是迭代器, 也可能是生成器
    // 函数就是生成器
    //
    const it = typeof saga === 'function' ? saga() : saga

    function next(value, isError) {
        let result
        if (isError) {
            result = it.throw(value)
        } else {
            result = it.next(value)
        }

        const { done, value: resultValue } = result

        // 迭代器执行完毕
        if (done) {
            doneCallback?.(resultValue)
            return
        }

        // 迭代器
        if (typeof resultValue[Symbol.iterator] === 'function') {
            const newIt = resultValue
            // 开启新的子进程
            runSaga(env, newIt)
            // 不阻塞
            next()
            return
        }

        // promise
        if (typeof resultValue?.then === 'function') {
            // 需要阻塞
            resultValue
                .then(next)
                .catch(e => {
                    next(e, true)
                })
            return
        }

        switch (resultValue.type) {
            case TAKE:
                // 订阅动作
                // 等待动作发生, 等不到就一直等, 阻塞
                channel.subscribe(resultValue.actionType, next)
                break
            case PUT:
                // 不会阻塞saga执行
                dispatch(resultValue.action)
                next()
                break
            case FORK:
                // 开启新的子进程执行saga
                runSaga(env, resultValue.saga)
                next()
                break
            case CALL:
                resultValue.fn(...resultValue.args)
                    .then(next)
                    .catch(e => {
                        next(e, true)
                    })
                break
            case CPS:
                resultValue.fn(...resultValue.args, (error, ...newArgs) => {
                    if (!error) {
                        next(newArgs)
                    } else {
                        next(error, true)
                    }
                })
                break
            case ALL:
                const effects = resultValue.effects
                const result = []
                let completeCount = 0

                effects.forEach((effect, index) => {
                    const finashCallback = (ret) => {
                        completeCount += 1
                        result[index] = ret
                        if (completeCount === effects.length) {
                            next(result)
                        }
                    }
                    runSaga(env, effect, finashCallback)
                })
                break
            case SELECT:
                const state = resultValue.selector(getState())
                next(state)
                break
            default:
                break
        }
    }

    next()
}

export default runSaga