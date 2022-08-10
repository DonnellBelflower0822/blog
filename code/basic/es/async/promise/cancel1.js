function wrap(p) {
    let resolve = null
    let reject = null

    const p1 = new Promise((_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
    })

    p1.abort = reject

    p.then(resolve, reject)

    return p1
}

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 1000);
});
let obj = wrap(promise);
obj.then(res => {
    console.log(res);
});
obj.abort("请求被拦截");
