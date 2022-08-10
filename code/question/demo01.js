// 例1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 例2：
// 输入： nums = [3,2,4], target = 6
// 输出： [1,2]

// 例3：
// 输入： nums = [3,3], target = 6
// 输出： [0,1]

const getIndexArray = (arr, target) => {
    const map = new Map()
    for (let i = 0; i < arr.length; i += 1) {
        if (map.has(target - arr[i])) {
            return [
                map.get(target - arr[i]),
                i
            ]
        }

        map.set(arr[i], i)
    }
}

console.log(getIndexArray([2, 7, 11, 15], 9))
console.log(getIndexArray([3, 2, 4], 6))
console.log(getIndexArray([3, 3], 6))