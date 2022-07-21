function wait(callback, ms = 1000) {
    setTimeout(callback, ms)
}

wait(() => {
    // do some thing
    wait(() => {
        // do other thing
    })
})