function myInstanceof(instance, constructor) {
  // 处理null和undefined的情况
  if (instance === undefined || instance === null) {
    throw new Error('error')
  }

  // 处理普通类型
  if (typeof instance !== 'object' && typeof instance !== 'function') {
    return false
  }

  let instanceProto = instance.__proto__;
  const { prototype } = constructor

  while (true) {
    if (instanceProto === null) {
      return false
    }

    if (prototype === instanceProto) {
      return true
    }

    instanceProto = instanceProto.__proto__
  }
}