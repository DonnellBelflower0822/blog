var it = makeIterator(['a', 'b']);

console.log(it.next()) // { value: "a", done: false }
console.log(it.next()) // { value: "b", done: false }
console.log(it.next()) // { value: undefined, done: true }
console.log(it.next()) // { value: undefined, done: true }

function makeIterator(array) {
    let index = 0
    return {
        next() {
            return (
                index < array.length
                    ? { done: false, value: array[index++] }
                    : { done: true, value: undefined }
            )
        }
    }
}