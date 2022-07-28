# 手撕dva

> 只处理model

## 入口文件

```js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { prefixedNamespace } from './prefix'
import { getRootReducer } from './createReducer'
import { getSagas } from './getSagas'

function dva() {
    const app = {
        _models: [],
        model,
        _router: null,
        router,
        start
    }

    function model(appModel) {
        // 补全命名空间
        const prefixedModel = prefixedNamespace(appModel)
        this._models.push(prefixedModel)
    }

    function router(_router) {
        this._router = _router
    }

    function start(selector) {
        // 获取rootReducer
        const rootReducer = getRootReducer(app._models)

        // 创建saga中间件
        const sagaMiddleware = createSagaMiddleware()

        // redux
        const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

        // 获取saga
        const sagas = getSagas(app)
        sagas.forEach(sagaMiddleware.run)

        // mount
        const root = createRoot(document.querySelector(selector))
        root.render(
            <Provider store={store}>
                {this._router()}
            </Provider>
        )
    }

    return app
}

export default dva

export { connect } from 'react-redux'
```

## createRootReducer

> 将各个model的reducer对象转换成一个rootReducer函数

```js
import { combineReducers } from 'redux'

function getPartReducer(model) {
    return function (state = model.state, action) {
        const reducer = model.reducers[action.type]
        if (reducer) {
            return reducer(state, action)
        }

        return state
    }
}

export const createRootReducer = (models) => {
    const initialReducers = {}
    models.forEach(model => {
        // {
        //      a:(state,action)=>{return state}
        //      b: (state,action)=>{return state}
        // }
        // 将model的reducer对象转成reducer函数
        initialReducers[model.namespace] = getPartReducer(model)
    })

    // 多个reducer合并成根rootReducer
    const rootReducer = combineReducers(initialReducers)

    return rootReducer
}
```

## getSagas

> 处理model的effects

```js
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
```