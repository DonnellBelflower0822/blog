import MyPromise from "./MyPromise";

console.log(1)
const p1 = new MyPromise((resolve) => {
    console.log(2)
    resolve('hello myPromise')
})
console.log(3)
p1.then((value: any) => {
    // 执行时机是微任务调用队列
    console.log('myPromise', 4)
    // console.log(value)
})

console.log(5)

console.log('===========')

console.log(1)
const p2 = new Promise((resolve) => {
    console.log(2)
    resolve('hello myPromise')
})
console.log(3)
p2.then((value: any) => {
    console.log('promise', 4)
    // console.log(value)
})

console.log(5)