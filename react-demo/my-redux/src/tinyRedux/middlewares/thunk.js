// eslint-disable-next-line import/no-anonymous-default-export
export default (store) => (next) => (action) => {
  console.log('thunk')
  if (typeof action === 'function') {
    action(next)
  } else {
    next(action)
  }
}