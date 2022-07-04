// const Promise = require('./Promise')

function readFile(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filename === 'name') {
        resolve('allen')
      } else if (filename === 'age') {
        resolve(27)
      } else {
        reject('error')
      }
    }, 1000);
  })
}

Promise
  .race([readFile('name'), readFile('age'), 1, 2])
  .then(data => {
    console.log(data)
  }, error => {
    console.log(error)
  })