import * as sagaEffects from 'redux-saga/effects'

export function getSagas(app) {
    const sagas = []

    for (const model of app._models) {
        // 每个model的effects作为一个子进程给sagaMiddleware.run执行
        sagas.push(
            getSaga(model.effects, model)
        )
    }

    return sagas
}

function getSaga(effects, model) {
    return function* () {
        for (const key in effects) {
            // 每个effect生成一个watcherSaga
            const watcherSaga = getWatcherSaga(key, effects[key], model)
            // 用子进程进行执行
            yield sagaEffects.fork(watcherSaga)
        }
    }
}

function getWatcherSaga(key, effect, model) {
    function* workSaga(action) {
        const effects = {
            ...sagaEffects,
            put: function (action) {
                return sagaEffects.put({
                    ...action,
                    type: action.type.includes('/')
                        ? action.type
                        : `${model.namespace}/${action.type}`
                })
            }
        }
        yield effect(action, effects)
    }

    return function* () {
        yield sagaEffects.takeEvery(key, workSaga)
    }
}