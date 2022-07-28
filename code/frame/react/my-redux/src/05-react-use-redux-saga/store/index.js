import { applyMiddleware, createStore } from "../../core/redux"
import rootReducer from "./reducer"
import createSagaMiddleware from '../../core/redux-saga'
import rootSaga from "../saga"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
export default store
