import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
// import logger from './middleware/logger'
// import test from './middleware/test'
// import thunk from './middleware/thunk'

// import thunk from 'redux-thunk'

import createSageMiddleware from 'redux-saga'
import rootSaga from './saga/root.saga'

// 创建saga的中间件
const sageMiddleWare = createSageMiddleware()

export default createStore(
  rootReducer,
  applyMiddleware(sageMiddleWare)
)

// 启用saga
sageMiddleWare.run(rootSaga)
