function wait(cb) {
  setTimeout(() => {
    cb()
  }, 1000)
}

wait(() => {
  // do some thing
  wait(() => {
    // do some thing
  })
})