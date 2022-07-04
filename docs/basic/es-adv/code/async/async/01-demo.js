function wait(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

async function fn() {
  console.log('hello')
  const a = await wait('aa')
  console.log(a)
  const b = await wait('bb')
  console.log(b)
  return 'end'
}

fn()