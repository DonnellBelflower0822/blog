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

const g = gen()

// g.next().value 返回其实就是wait('hello'), 也就是promise
g.next().value.then(data => {
  // g.next(data).value
  // 1. 将wait('hello')的结果给到 a
  // 2. 执行wait('world')
  // g.next(data).value也是一个promise
  g.next(data).value.then(data => {
    // 1. 将wait('world')的结果给到 b
    // 2. 执行console.log(a,b)
    g.next(data)
  })
})
