const arr = [1, 2, 3]

const it = arr[Symbol.iterator]()

// { value: 1, done: false }
console.log(it.next())
// { value: 2, done: false }
console.log(it.next())
// { value: 3, done: false }
console.log(it.next())
// { value: undefined, done: true }
console.log(it.next())


for (const item of arr) {
    // 1
    // 2
    // 3
    console.log(item)
}