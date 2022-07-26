
function flattern(array = []) {
    return array.reduce((prevArr, item) => [
        ...prevArr,
        ...(Array.isArray(item) ? flattern(item) : [item])
    ], [])
}

var arr = [1, 2, [1, [2, 3, [4, 5, [6]]]]]
console.log(flattern(arr))  // [ 1, 2, 1, 2, 3, 4, 5, 6 ]
console.log(arr.flat()) // [ 1, 2, 1, [ 2, 3, [ 4, 5, [ 6 ] ] ] ]
console.log(arr.flat(Infinity)) // [ 1, 2, 1, 2, 3, 4, 5, 6 ]