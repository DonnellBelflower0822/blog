function myNew(constructor, ...args) {
  // 创建空对象
  const obj = {}
  // 将对象的__proto__ 指向构造函数的原型
  obj.__proto__ = constructor.prototype
  // 执行构造函数,并且将this执行obj
  const result = constructor.apply(obj, args)
  // 处理构造函数的返回值
  if (
    (result !== null && typeof result !== 'object')
    || typeof result !== 'function'
  ) {
    return obj
  }

  return result
}