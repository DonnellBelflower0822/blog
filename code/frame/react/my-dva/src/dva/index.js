import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { prefixedNamespace } from './prefix'
import { createRootReducer } from './createRootReducer'
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
        const prefixedModel = prefixedNamespace(appModel)
        this._models.push(prefixedModel)
    }

    function router(_router) {
        this._router = _router
    }

    function start(selector) {
        const rootReducer = createRootReducer(app._models)

        const sagaMiddleware = createSagaMiddleware()
        const sagas = getSagas(app)

        // redux
        const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

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
