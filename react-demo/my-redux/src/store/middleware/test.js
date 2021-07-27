// eslint-disable-next-line import/no-anonymous-default-export
export default store => next => action => {
  console.log('test', store)
  console.log('test', action)
  next(action)
}
