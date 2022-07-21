import MyPromise from "./MyPromise";

const p1 = new MyPromise((resolve) => {
    resolve('hello myPromise')
})

p1.then((value: any) => {
    console.log(value)
})

const p2 = new MyPromise(() => {
    throw new Error('error')
})

p2.catch((reason) => {
    console.log(reason)
})