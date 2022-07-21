import MyPromise from "./MyPromise";

console.log('MyPromise', 1)
const p1 = new MyPromise((resolve) => {
    console.log('MyPromise', 2)
    setTimeout(() => {
        console.log('MyPromise', 3)
        resolve('hello myPromise')
        console.log('MyPromise', 4)
    })
})
p1.then((value: any) => {
    console.log('myPromise', 5, value)
})

console.log('==============')

console.log('Promise', 1)
const p2 = new Promise((resolve) => {
    console.log('Promise', 2)
    setTimeout(() => {
        console.log('Promise', 3)
        resolve('hello myPromise')
        console.log('Promise', 4)
    })
})
p2.then((value: any) => {
    console.log('Promise', 5, value)
})