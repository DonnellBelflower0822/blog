const s = Symbol('foo')
const obj = { [s]: 'symbol' }

for (let i in obj) {
    console.log('for in ' + i)  // 不会执行
}

console.log(Object.keys(obj))   // []

console.log(Object.getOwnPropertyNames(obj))    // []

console.log(JSON.stringify(obj))    // {}

console.log(Object.getOwnPropertySymbols(obj))  // [ Symbol(foo) ]

console.log(Reflect.ownKeys(obj))   // [ Symbol(foo) ]


