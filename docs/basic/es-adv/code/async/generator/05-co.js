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

function co(gen, ...args) {
  const ctx = this
  return new Promise((resolve, reject) => {
    if (typeof gen === 'function') {
      // 执行迭代器
      gen = gen.apply(ctx, args);
    }

    if (!gen || typeof gen.next !== 'function') {
      // 如果不存在next就直接走resolve
      return resolve(gen);
    }

    function onFulfilled(res) {
      let ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
      return null
    }

    onFulfilled()

    function next(ret) {
      // 如果结束
      if (ret.done) {
        return resolve(ret.value)
      }

      const p = Promise.resolve(ret.value)

      // 没有执行结束, 就处理primose
      result.value.then(data => {
        // 将promise的结果给到上一个yield的左边变量
        next(data)
      })
    }

    next()
  })
}

co(gen)