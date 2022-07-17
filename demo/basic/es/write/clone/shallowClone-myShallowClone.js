const myShallowClone = (data) => {
    if (typeof data !== 'object' || data === null) {
        return data
    }

    const newData = new data.constructor()

    for (let i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
            newData[i] = data[i]
        }
    }

    return newData
}

// myShallowClone.constutor

const obj = { a: 1, b: { c: 2 } }

const obj1 = myShallowClone(obj)

obj.a = 3
obj.b.c = 4

console.log(obj, obj1)