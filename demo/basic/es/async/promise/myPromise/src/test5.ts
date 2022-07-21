import MyPromise from "./MyPromise";

const p1 = new MyPromise((resolve) => {
    resolve('hello myPromise')
})
const p2 = p1.then((value: any) => {
    console.log('myPromise', 5, value)
    return p2
})

// console.log('==============')
// const p3 = new Promise((resolve) => {
//     resolve('hello myPromise')
// })
// //@ts-ignore
// const p4 = p2.then((value: any) => {
//     console.log(5, value)
//     // Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
//     return p4
// })