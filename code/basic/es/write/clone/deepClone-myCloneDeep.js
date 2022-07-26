
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
    Reflect.ownKeys(data).forEach(i => {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
            // 递归
            newData[i] = cloneDeep(data[i], weakMap)
        }
    })

    return newData
}


// 测试代码

const symbol = Symbol()
var obj = {
    string: 'str',
    number: 0,
    boolean: true,
    undefined: undefined,
    null: null,

    date: new Date(),

    reg: /\d/,

    console: console.log,

    [symbol]: Symbol(),

    o: {
        a: 1,
        b: 2
    },

    a: [1, 2, { c: 3, d: 4 }]
}

const newObj = cloneDeep(obj)

console.log(obj.o === newObj.o)
console.log(newObj)

