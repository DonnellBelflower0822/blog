import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import createSagaMiddleware from '../my-saga'
import rootSaga from './saga'
const sagaMiddleware = createSagaMiddleware()
const store = applyMiddleware(sagaMiddleware)(createStore)(rootReducer)

sagaMiddleware.run(rootSaga)

export default store


