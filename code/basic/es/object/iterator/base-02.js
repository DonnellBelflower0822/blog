const obj1 = {
    a: 1,
    b: 2,
    [Symbol.iterator]() {
        let i = 0
        const arr = Object.keys(this)
        return {
            next() {
                return i < arr.length
                    ? { value: arr[i++], done: false }
                    : { value: undefined, done: true }
            }
        }
    }
}

for (const key of obj1) {
    console.log(222, key)
}

const obj2 = {
    a: 1,
    b: 2
}
// TypeError: obj2 is not iterable
for (const key of obj2) {
    console.log(222, key)
}