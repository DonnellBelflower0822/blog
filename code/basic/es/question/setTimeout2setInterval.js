function mySetInterval(fn, ms, ...args) {
    const that = this
    let timer = null
    function interval() {
        timer = setTimeout(() => {
            fn.apply(that, args)
            interval()
        }, ms)
    }

    interval()

    return {
        clear() {
            clearTimeout(timer)
        }
    }
}

