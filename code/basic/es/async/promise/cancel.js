let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 1000);
});
let obj = wrap(promise);
obj.promise.then(res => {
    console.log(res);
});
// obj.resolve("请求被拦截了");
// obj.reject("请求被拒绝了");

function wrap(p) {
    let defer = {}
    const newPromise = new Promise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })

    defer.promise = Promise.race([newPromise, p])
    return defer
}
