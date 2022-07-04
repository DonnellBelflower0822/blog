const Promise = require('./Promise')

const p = new Promise((resolve, reject) => {
  resolve(100)
})

p.then(res => {
  console.log(res)
})