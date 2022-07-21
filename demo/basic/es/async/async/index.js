function wait() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('allen')
        }, 1000)
    })
}

async function fn() {
    const res = await wait()
    const a = await 'string';
    console.log('111', res, a)
}

fn()

function spawn(generateFn) {
    return new Promise((resolve, reject) => {
        const it = generateFn()

        function step(nextFn) {
            let next
            try {
                next = nextFn()
            } catch (e) {
                return reject(e)
            }

            if (next.done) {
                return resolve(next.value)
            }

            Promise.resolve(next.value).then(
                (value) => {
                    step(() => {
                        return it.next(value)
                    })
                },
                (reason) => {
                    return it.throw(reason)
                }
            )
        }

        step(() => {
            return it.next(undefined)
        })
    })
}

function fn1() {
    return spawn(function* () {
        const res = yield wait()
        const a = yield 'string'
        console.log('222', res, a)
        return a + res
    })
}

fn1().then((value) => {
    console.log(value)
})