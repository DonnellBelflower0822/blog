const obj = {
    str: 'string',
    num: 0,
    bool: true,
    null: null,
    arr: [1, 2],
    o: {
        f: 'f'
    },

    // 转成字符串
    date: new Date(),

    // 转成空对象 {}
    reg: /\d/,

    // 忽略
    undefined: undefined,
    console: console.log,
    symbol: Symbol()
}

var a = JSON.parse(JSON.stringify(obj))
// {
//     "str": "string",
//     "num": 0,
//     "bool": true,
//     "null": null,
//     "arr": [1, 2],
//     "o": {
//         "f": "f"
//     },
//     "reg": {},
//     "date": "2022-07-16T12:28:53.881Z"
// }