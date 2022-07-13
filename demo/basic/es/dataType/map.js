// Map to Array
const map = new Map()
map.set('hello', 'world')
map.set({}, 'world')
console.log([...map])   // [ [ 'hello', 'world' ], [ {}, 'world' ] ]

// Array to Map
const arr = [['hello', 'world'], [{}, 'world']]
console.log(new Map(arr))

// Map to Object
const map1 = new Map()
map1.set('jack', 'tom')

const mapToObject = (_map) => {
    const obj = {}
    for (let [key, value] of _map.entries()) {
        obj[key] = value
    }
    return obj
}

console.log(mapToObject(map1))

// object to Map
const obj = { jack: 'tom' }
console.log(new Map(Object.entries(obj)))

const objectToMap = (_object) => {
    const map = new Map()
    Object.entries(_object).forEach(([key, value]) => {
        map.set(key, value)
    })
    return map
}
console.log(objectToMap(obj))

