// 示例 1:

// 输入: [1,2,3,1]
// 输出: true

// 示例 2:

// 输入: [1,2,3,4]
// 输出: false

const isUnique = (arr) => {
    const map = new Map()
    for (let i = 0; i < arr.length; i += 1) {
        if (map.has(arr[i])) {
            return false
        }
        map.set(arr[i], true)
    }

    return true
}

console.log(isUnique([1, 2, 3, 1]))
console.log(isUnique([1, 2, 3, 4]))