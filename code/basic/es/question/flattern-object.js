const obj = {
    a: {
        b: 1,
        c: 2,
        d: { e: 5 }
    },
    b: [1, 3, { a: 2, b: 3 }],
    c: 3
}

function flattern(obj, path = []) {
    return Object.keys(obj).reduce((newObject, key) => {
        const value = obj[key]
        const currentPath = [...path, key]
        if (typeof value === 'object') {
            return {
                ...newObject,
                ...flattern(value, currentPath)
            }
        }

        return {
            ...newObject,
            [currentPath.join('.')]: value
        }
    }, {})
}

console.log(flattern(obj))