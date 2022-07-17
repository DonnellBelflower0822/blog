function customNew(Constructor, ...args) {
    const object = new Object()
    object.__proto__ = Constructor.prototype

    const result = Constructor.apply(object, args)

    if (
        (typeof result === 'object' && result !== null)
        || typeof result === 'function'
    ) {
        return result
    }

    return object
}

function Person(name) {
    this.name = name
}

const a = customNew(Person, 'allen')

console.log(a)