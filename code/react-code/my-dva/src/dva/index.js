import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

export { connect } from 'react-redux'

export default function dva() {
  const app = {
    model,
    _models: [],
    router,
    _router: null,
    start
  }
  const initialReducers = {}

  function router(router) {
    app._router = router
  }

  function model(model) {
    const prefixedModel = prefixNamespace(model)
    app._models.push(prefixedModel)
  }

  function start(rootSelector) {
    for (const model of app._models) {
      initialReducers[model.namespace] = createReducer(model)
    }

    const rootReducers = createReducers()
    const store = createStore(rootReducers)
    ReactDOM.render(
      <Provider store={store}>
        {app._router()}
      </Provider>,
      document.querySelector(rootSelector)
    )
  }

  function createReducers() {
    return combineReducers(initialReducers)
  }

  return app
}

function prefixNamespace(model) {
  if (model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace)
  }
  return model
}

function prefix(reducers, namespace) {
  return Object.keys(reducers).reduce((obj, key) => ({
    ...obj,
    [`${namespace}/${key}`]: reducers[key]
  }), {})
}

function createReducer(model) {
  const { state: initialState, reducers } = model
  return (state = initialState, action) => {
    const reducer = reducers[action.type]
    if (!reducer) {
      return state
    }

    return reducer(state, action)
  }
}
