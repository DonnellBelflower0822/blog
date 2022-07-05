export const wait = (time = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('ok')
        }, time)
    })
}

export const tmp = () => {
    console.log('纯无用代码')
}