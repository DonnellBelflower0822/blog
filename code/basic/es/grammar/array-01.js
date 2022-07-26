const arr = [1, 2, 3]

console.log(['arr', ...arr])

// 扩展运算符实现原理, 调用[Symbol.iterator]迭代器函数
const obj = {
    value: [1, 2, 3],
    [Symbol.iterator]: function* () {
        let i = 0
        while (i < this.value.length) {
            yield this.value[i]
            i += 1
        }
    }
}
console.log([...obj])   // [1,2,3]

const arrayLike = {
    0: 1,
    1: 2,
    2: 3,
    length: 4
}

// Uncaught TypeError: arrayLike is not iterable
console.log([...arrayLike])

console.log(Array.from(arrayLike))

console.log(Array.of(1, 2, 3))