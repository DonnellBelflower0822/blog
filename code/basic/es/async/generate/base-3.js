function wait(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data)
        }, 1000)
    })
}

function* gen() {
    const a = yield wait('hello')
    const b = yield wait('world')
    console.log(a, b)
}

const it = gen()
it.next().value.then((value) => {
    it.next(value).value.then(val1 => {
        it.next(val1)
    })
})