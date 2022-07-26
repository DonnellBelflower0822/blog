const square = (x) => x * x

const arr = [1, 2]

arr.map(square)

const once = (fn) => {
    let flag = false

    return function (...args) {
        if (flag) {
            return
        }

        flag = true
        fn.apply(this, ...args)
    }
}

const pay = once(() => {
    console.log('支付')
})

// 仅会支付一次

pay()
pay()
pay()
pay()
