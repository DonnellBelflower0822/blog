import MyPromise from "./MyPromise";

console.log(1)
const p1 = new MyPromise((resolve) => {
    console.log(2)
    setTimeout(() => {
        resolve('hello myPromise')
    })
})
console.log(3)
p1.then((value: any) => {
    console.log('myPromise', 4, value)
})
