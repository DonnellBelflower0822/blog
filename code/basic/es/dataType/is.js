console.log(Object.prototype.toString.call({}))

const is = (type, data) => (
    Object.prototype.toString.call(data).match(/\[object (.*)\]/)?.[1] === (type[0].toUpperCase() + type.slice(1))
)

const isObject = is.bind(null, 'object')

console.log(is('object', {}))
console.log(is('array', []))

console.log(isObject({}))



