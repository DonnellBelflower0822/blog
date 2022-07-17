
function dateThrottle(fn, ms = 50) {
    let time = Date.now()

    return function (...args) {
        const currentTime = Date.now()

        if (currentTime - time < ms) {
            return
        }

        time = currentTime
        fn.apply(this, args)
    }
}

const betterFn = dateThrottle(() => console.log('fn 函数执行了'), 1000)
// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
setInterval(betterFn, 10)

function timerThrottle(fn, ms = 50) {
    let timer = null

    return function (...args) {
        if (timer) {
            return
        }
        const that = this
        timer = setTimeout(function () {
            fn.apply(that, args)
            timer = null
        }, ms)
    }
}

const betterFn1 = timerThrottle(() => console.log('fn 函数执行了'), 1000)
// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
setInterval(betterFn1, 10)