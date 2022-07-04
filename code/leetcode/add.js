console.log(twoSum([2, 7, 11, 15], 9))


function twoSum(arr, target) {
  const map = new Map()

  for (let i = 0;i < arr.length;i += 1) {
    if (map.has(target - arr[i])) {
      return [map.get(target - arr[i]), i]
    }

    map.set(arr[i], i)
  }

}