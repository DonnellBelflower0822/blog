
const cloneDeep = (data, weakMap = new WeakMap()) => {
    // 排除基础类型的深度拷贝
    if (typeof data !== 'object' || data === null) {
        return data
    }

    const { constructor } = data

    // 日期拷贝
    if (constructor instanceof Date) {
        return new Date(data)
    }

    // 正则拷贝
    if (constructor instanceof RegExp) {
        return new RegExp(data)
    }

    // 防止递归
    if (weakMap.has(data)) {
        return weakMap.get(data)
    }

    // 构造
    const newData = new constructor()
    weakMap.set(data, newData)

    // 遍历
    for (let i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
            // 递归
            newData[i] = cloneDeep(data[i], weakMap)
        }
    }

    return newData
}


// 测试循环引用代码

var obj1 = {}
var obj2 = { a: obj1 }
obj1.obj2 = obj2

// console.log(JSON.parse(JSON.stringify(obj1)))

const a = cloneDeep(obj1)
console.log(a)