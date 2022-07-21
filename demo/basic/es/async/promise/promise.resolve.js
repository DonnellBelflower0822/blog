const p = new Promise((resolve) => {
    console.log('promise实例')

    resolve(10)
})

const p1 = Promise.resolve(p)
p1.then((value) => {
    console.log('p1', value)
})


const thenable = {
    then(resolve, reject) {
        resolve('111')
    }
}

const p2 = Promise.resolve(thenable)
p2.then(value => {
    console.log('p2', value)
})

const p3 = Promise.resolve(100)

p3.then((value) => {
    console.log('p3', value)
})