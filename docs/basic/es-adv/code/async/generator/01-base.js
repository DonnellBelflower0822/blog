function* fn() {
  console.log('hello')
}

// 执行fn返回遍历器.
// 此时不会输出hello
const generator = fn()
console.log(generator)