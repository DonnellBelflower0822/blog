function Person(name) {
    this.name = name
}

const man = new Person('allen')
console.log(man.name)

function customNew(Construtor, ...args) {
    const obj = new Object()

    obj.__proto__ = Construtor.proptype

    const result = Construtor.apply(obj, args)

    return result instanceof Object ? result : obj
}

const woman = customNew(Person, 'tiya')

console.log(woman)

