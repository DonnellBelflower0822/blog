export const wait = (time = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('ok')
        }, time)
    })
}

export const sum = (a: number, b: number) => {
    // console.log('纯无用代码')
    return a + b
}