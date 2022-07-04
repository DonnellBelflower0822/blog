// const Promise = require('./Promise')

function readFile(filename) {
  const defer = Promise.deferred()

  setTimeout(() => {
    if (filename === 'name') {
      defer.resolve('allen')
    } else if (filename === 'allen-age') {
      defer.resolve(27)
    } else {
      defer.reject('error')
    }
  }, 1000);

  return defer.promise
}

readFile('name').then(res => {
  console.log(res)
})