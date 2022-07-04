// const Promise = require('./Promise')

function readFile(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filename === 'name') {
        resolve('allen')
      } else if (filename === 'allen-age') {
        resolve(27)
      } else {
        reject('error')
      }
    }, 1000);
  })
}

readFile().catch(e => {
  console.log(e)
})