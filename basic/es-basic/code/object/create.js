function create(obj) {
  const newObj = {}
  newObj.__proto__ = obj
  return newObj
}