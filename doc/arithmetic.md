# 算法
- 用JS实现千位分隔符
- 快速排序

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

## 去掉一组整型数组重复的值


## 冒泡
```javascript
var arr = [ 3, 1, 46, 223, 62, 63, 7, 34 ]
let length = arr.length
for (let i = 0; i < length; i++) {
  for (let j = i + 1; j < length; j++) {
    let left = arr[ i ]
    let right = arr[ j ]
    if (left > right) {
      arr[ i ] = right
      arr[ j ] = left
    }
  }
}
```

## 选择排序
```javascript
/**
* 选择排序
*  每一趟找最小值的下标与当前趟数下标的换位置
* @param arr
*/
function choice_sort (arr) {
let length = arr.length
let min_index, tmp
for (let i = 0; i < length; i++) {
  // 初始化这一趟的最小值下标
  min_index = i
  for (let j = i + 1; j < length; j++) {
      // 寻找最小数
      if (arr[min_index] > arr[j]) {
        min_index = j
      }
    }
    // 一趟结束了，可以换位置
    tmp = arr[i]
    arr[i] = arr[min_index]
    arr[min_index] = tmp
  }
  return arr
}
```

## 二分查找
```javascript
 /**
    * 二分查找
    * @param arr 要查找的数组
    * @param item 要查找的item
    * @param startIndex 开始的索引
    * @param endIndex 结束的索引
    * @returns {*}
    */
function search (arr, item, startIndex, endIndex) {
    if (startIndex > endIndex) {
      // 递归返回
      return false
    }
    let midIndex = Math.floor((endIndex + startIndex) / 2)
    let midVal = arr[midIndex]
    if (midVal > item) {
      // 查找的数在中间索引的左侧
      return search(arr, item, startIndex, midIndex - 1)
    } else if (midVal < item) {
      // 查找的数在中间索引的右侧
      return search(arr, item, midIndex + 1, endIndex)
    } else {
      return midIndex
    }
}
```
