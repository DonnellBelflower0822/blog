function wait(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

function* fn() {
  console.log('hello')
  const a = yield wait('aa')
  console.log(a)
  const b = yield wait('bb')
  console.log(b)
  return 'end'
}

// fn()

function wrapper(...args) {
  return spawn(function* () {
    
  })
}
function spawn(gen) {
  return new Promise((resolve, reject) => {
    const g = gen()
    function step() {

    }

    step()
  })
}
