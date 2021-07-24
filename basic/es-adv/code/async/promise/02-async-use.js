const Promise = require('./Promise')

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000);
})

p.then(res => {
  console.log(res)
})