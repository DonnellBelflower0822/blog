const Promise = require('./Promise')

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

readFile('name')
  .then(
    data => {
      // 返回promise
      return readFile(data + '-age')
    }
  )
  .then(
    data => {
      console.log(1, data)
      // 返回普通值
      return 100
    },
    (e) => {
      console.log(2, e)
      // 返回undefined
    }
  )
  .then(
    data => {
      console.log(3, data)
      // 没有返回值,默认会返回undefined
    }
  )
  .then(
    data => {
      console.log(4, data)
      // 抛出错误
      throw new Error('')
    }
  )
  .then(
    data => {
      console.log(5, data)
    },
    e => {
      console.log(6, e)
    }
  )