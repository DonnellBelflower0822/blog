function add(a) {
    const fn = (b) => {
        fn.sum += b
        return fn
    }
    fn.toString = function () {
        return fn.sum
    }
    fn.sum = a
    return fn
}

console.log(add(1) + '');
console.log(add(1)(2) + '');
console.log(add(1)(2)(3) + '');
console.log(add(1)(2)(3)(4) + '');