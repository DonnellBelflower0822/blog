/**
 * typeof
 * 获取一个变量声明或对象的类型。
 * typeof 属性/函数/实例 = 类型
 */
interface Person {
    name: string,
    age: number
}

const allen: Person = { name: 'allen', age: 27 }

type T1 = typeof allen

const t1: T1 = {
    name: 'tim',
    age: 14
}

function fn1(man: typeof allen) {
    return man.name
}

// type T2 = (man: typeof allen) => string
type T2 = typeof fn1

/**
 * keyof
 * 获取某种类型的所有键，其返回类型是联合类型。
 */

interface Person1 {
    name: string,
    age: number
}

// name | age
type K1 = keyof Person1
const k1: K1 = 'name'

// string | number
type K2 = keyof { [x: string]: Person1 }

/**
 * in
 * 遍历枚举类型：
 */

type K3 = 'a' | 'b' | 'c'
// { a: string, b: string, c: string}
type K4 = {
    [x in K3]: string
}

const k4: K4 = {
    a: '',
    b: '',
    c: ''
}

/**
 * todo infer
 */


/**
 * extends
 * 有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。
 */

interface In16 {
    length: number
}

function fn<T extends In16>(arg: T): T {
    return arg
}
// Argument of type 'number' is not assignable to parameter of type 'In16'
// fn(1)

fn({ length: 1 })

