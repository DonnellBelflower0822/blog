import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
// import logger from './middleware/logger'
// import test from './middleware/test'
// import thunk from './middleware/thunk'

// import thunk from 'redux-thunk'

import createSageMiddleware from 'redux-saga'
import counterSaga from './saga/counter.saga'

const sageMiddleWare = createSageMiddleware()

export default createStore(
  rootReducer,
  applyMiddleware(sageMiddleWare)
)

sageMiddleWare.run(counterSaga)