/**
 * in
 */
interface Admin {
    name: string
    isAdmin: boolean
    loginTime: number
}

interface Guest {
    name: string,
    limit: boolean,
    time: number
}

type UnknownType = Admin | Guest

function test(type: UnknownType) {
    if ('isAdmin' in type) {
        // type = Admin
        console.log(type.loginTime)
    }
    if ('limit' in type) {
        // type = Guest
        console.log(type.time)
    }
}

/**
 * typeof
 */
function getUnit(value: string | number) {
    if (typeof value === 'string') {
        return value.slice(value.length - 2)
    }
    if (typeof value === 'number') {
        return 'px'
    }
    throw new Error('expected string or number, got ' + typeof value)
}
getUnit(1)
getUnit('10px')

/**
 * instanceof
 */
class Class1 {
    getName() { }
}
class Class2 {
    getAge() { }
}

function doSomeThing1(instance: Class1 | Class2) {
    if (instance instanceof Class1) {
        instance.getName()
        return
    }

    if (instance instanceof Class2) {
        instance.getAge()
        return
    }
    throw new Error('expected Class1 or Class2, got unknown')
}

const c1 = new Class1()
doSomeThing1(c1)




