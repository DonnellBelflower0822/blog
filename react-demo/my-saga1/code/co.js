function* gen() {
  const a = yield 1
  console.log(a)
  const b = yield 2
  console.log(b)
  const c = yield 3
  console.log(c)
}

function co(gen) {
  const it = gen()

  function next(value) {
    const res = it.next(value)
    if (res.done) {
      console.log(res.value)
      return
    }
    next(res.value)
  }
  next()
}

co(gen)