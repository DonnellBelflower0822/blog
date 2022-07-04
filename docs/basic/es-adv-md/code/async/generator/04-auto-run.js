function wait(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

function* gen() {
  const a = yield wait('hello')
  const b = yield wait('world')
  console.log(a, b)
}

function co(gen) {
  // 生成一个迭代器
  const g = gen()

  function next(data) {
    // 执行next
    const result = g.next(data)

    // 如果结束
    if (result.done) {
      return result.value
    }

    // 没有执行结束, 就处理primose
    result.value.then(data => {
      // 将promise的结果给到上一个yield的左边变量
      next(data)
    })
  }

  next()
}

co(gen)