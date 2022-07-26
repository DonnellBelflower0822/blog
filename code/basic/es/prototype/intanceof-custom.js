function Person() {
}

const man = new Person()

console.log(man instanceof Function)    // false
console.log(man instanceof Person)  // true
console.log(man instanceof Object)  // true

console.log(Function instanceof Object) // true

console.log(Object instanceof Function) // true

function myInstanceOf(instance, Constructor) {
    // 处理null和undefined的情况
    if (instance === undefined || instance === null) {
        throw new Error('error')
    }

    // 处理普通类型
    if (typeof instance !== 'object' && typeof instance !== 'function') {
        return false
    }
    
    const { prototype } = Constructor

    while (true) {
        if (instance.__proto__ === prototype) {
            return true
        }

        instance = instance.__proto__
        if (instance === null) {
            return false
        }
    }
}

console.log('myInstanceOf', myInstanceOf(man, Function))
console.log('myInstanceOf', myInstanceOf(man, Person))
console.log('myInstanceOf', myInstanceOf(man, Object))
console.log('myInstanceOf', myInstanceOf(Function, Object))
console.log('myInstanceOf', myInstanceOf(Object, Function))