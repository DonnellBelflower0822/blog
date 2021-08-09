function* gen() {
  const a = yield 1
  console.log(a)
  const b = yield 2
  console.log(b)
  const c = yield 3
  console.log(c)
}

const it = gen()
/**
yield 1
返回: {value: 1, done: false}
*/
console.log(it.next())
/**
const a = 'hello'
console.log(a)
yield 2
返回: {value: 2, done: false}
*/
console.log(it.next('hello'))
/**
const b = 'world'
console.log(b)
yield 3
返回: {value: 3, done: false}
*/
console.log(it.next('world'))
/**
const c = 'js'
console.log(c)
返回: {value: undefined, done: true}
 */
console.log(it.next('js'))