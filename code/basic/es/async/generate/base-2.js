function* fn() {
    console.log('hello')
    const a = yield 'aa'
    console.log(a)
    const b = yield 'bb'
    console.log(b)
    return 'end'
}

const it = fn()
const result0 = it.next(1)
console.log(result0)
const result1 = it.next(2)
console.log(result1)
const result2 = it.next(3)
console.log(result2)
const result3 = it.next(4)
console.log(result3)


/**
// 返回迭代器
const it = fn()

// console.log('hello')
// yield 'aa'
// result0 = {value: 'aa', done:false}
const result0 = it.next(1)
console.log(result0)

// const a = 2
// console.log(a)
// yield 'bb'
// result1 = {value:'bb',done:false}
const result1 = it.next(2)
console.log(result1)

// const b = 3
// console.log(b)
// result2 = {value: 'end',done: true}
const result2 = it.next(3)
console.log(result2)

// 执行result3 = {value:undefined,done:true}
// const result3 = it.next(4)
// console.log(result3)
*/