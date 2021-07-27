// eslint-disable-next-line import/no-anonymous-default-export
export default store => next => action => {
  // 只要是action是函数就调用action并传递dispatch
  if (typeof action === 'function') {
    return action(store.dispatch)
  }

  next(action)
}
