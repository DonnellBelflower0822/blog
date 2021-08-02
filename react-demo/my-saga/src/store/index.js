import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from '../my-saga'
import counter from './reducers/counter'
import rootSaga from './sagas'

const rootReducers = {
  counter
}

const sagaMiddleware = createSagaMiddleware()
const store = applyMiddleware(sagaMiddleware)(createStore)(combineReducers(rootReducers))
sagaMiddleware.run(rootSaga)

export default store