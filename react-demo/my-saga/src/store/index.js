import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import counter from './reducers/counter'
import rootSaga from './sagas'

const rootReducers = {
  counter
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers(rootReducers),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store