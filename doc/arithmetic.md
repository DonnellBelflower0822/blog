# 算法
- 用JS实现千位分隔符
- 插入排序

## 判断一个单词是否是回文
> mamam,redivider

```javascript
function check (num) {
  num += ''
  let str = ''
  for (let i = num.length - 1; i >= 0; i--) {
    str += num[ i ]
  }
  return str === num
}
```

## 数组去重
```javascript
let a = [1, '1', 1, NaN, NaN, undefined, undefined, null, null]
// 使用set
console.log([...new Set(a)])

// 使用对象的key
function unique (arr) {
let obj = {}
arr.forEach(item => {
  if (!obj[item]) {
    obj[item] = true
  }
})
return Object.keys(obj)
}
console.log(unique(a))
```

## 冒泡排序
```javascript
var arr = [1, 3, 20, 5, 2, 9, 6, 4, 80, 9, 4]
let length = arr.length
for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
        if (arr[i] > arr[j]) {
            let tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
        }
    }
}
console.log(arr)
```

## 选择排序
> 一趟确定最小值的下标
```javascript
var arr = [1, 3, 20, 5, 2, 9, 6, 4, 80, 9, 4]
let length = arr.length
for (let i = 0; i < length; i++) {
    let minIndex = i
    for (let j = i + 1; j < length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      let tmp = arr[minIndex]
      arr[minIndex] = arr[i]
      arr[i] = tmp
    }
}
console.log(arr)
```

## 快速排序
```javascript
function quickSort (arr) {
    // 如果到头了
    if (arr.length <= 1) return arr
    // 取中间index
    let mid = Math.floor(arr.length / 2)
    let left = []
    let right = []
    // 取中间的值，splice一面遍历
    let middleValue = arr.splice(mid, 1)[0]
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < middleValue) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return quickSort(left).concat([middleValue], quickSort(right))
}

console.log(quickSort(arr))
```

## 二分查找

```javascript
var arr1 = [1, 2, 3, 4, 4, 5, 6, 9, 9, 20, 80]
function search (arr, leftIndex, rightIndex, value) {
if (leftIndex > rightIndex) return -1
var middleIndex = leftIndex + Math.floor((rightIndex - 1) / 2)
if (arr[middleIndex] === value) {
  return middleIndex
} else if (arr[middleIndex] < value) {
  // 右侧
  return search(arr, middleIndex + 1, rightIndex)
} else if (arr[middleIndex] > value) {
  // 左侧
  return search(arr, leftIndex, middleIndex - 1)
}
}

console.log(search(arr1, 0, arr1.length, 5))
```