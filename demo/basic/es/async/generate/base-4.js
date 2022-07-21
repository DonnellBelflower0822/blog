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

function run(generate) {
    const it = generate()

    function next(value) {
        const result = it.next(value)
        if (result.done) {
            return result.value
        }

        result.value.then(next)
    }

    next()
}

run(gen)