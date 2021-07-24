function* fn() {
  console.log('hello')
  const a = yield 'aa'
  console.log(a)
  const b = yield 'bb'
  console.log(b)
  return 'end'
}

// 返回迭代器
const generator = fn()

/**
 * 执行语句
 * console.log('hello')
 * yield 'aa'
 * result0 = {value: 'aa', done:false}
 */
const result0 = generator.next(1)
console.log(result0)

/**
 * 执行语句
 * a = 2
 * console.log(a)
 * yield 'bb'
 * result1 = {value:'bb',done:false}
 */
const result1 = generator.next(2)
console.log(result1)

/**
 * 执行语句
 * b = 3
 * console.log(b)
 * // 如果有return的值作为result2.value
 * // 如果没有return, result2.value 为undefined
 * result2 = {value:'end',done:true}
 */
const result2 = generator.next(3)
console.log(result2)
