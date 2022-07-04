# 算法篇
- 数据结构
- 算法
- 设计模式


## 数组转树结构

```js
const data = [
  {
    parent: 3,
    id: 4,
    value: 4,
  },
  {
    parent: null,
    id: 1,
    value: 1,
  },
  {
    parent: 1,
    id: 2,
    value: 2,
  },
  {
    parent: 1,
    id: 3,
    value: 3,
  }
];

function toTree(arr) {
  const obj = {}
  arr.forEach(item => {
    const { parent, ...ext } = item
    if (!obj[item.id]) {
      obj[item.id] = ext
    } else {
      obj[item.id] = {
        ...obj[item.id],
        ...ext
      }
    }

    if (!obj[parent]) {
      obj[parent] = {
        children: []
      }
    } else if (!obj[parent].children) {
      obj[parent].children = []
    }

    obj[parent].children.push(obj[item.id])
  });

  return obj.null.children
}

console.log(toTree(data))
```


