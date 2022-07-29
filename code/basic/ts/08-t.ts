/**
 * Partial
 */
interface T111 {
    name: string,
    age: number
}

type T112 = Partial<T111>

const t112: T112 = {
    name: 'string'
}

type MyPartial<T> = {
    [K in keyof T]?: T[K]
}

type T113 = MyPartial<T111>
const t113: T113 = {
    name: 'string'
}


/**
 * Record
 */

type Man = 'allen' | 'tim'
type Info = { name: string, age: number }

type Mans1 = Record<Man, Info>
const mans1: Mans1 = {
    allen: { name: 'allen', age: 2 },
    tim: { name: '', age: 2 }
}

type MyRecord<K extends keyof any, T> = {
    [P in K]: T
}

type Mans2 = MyRecord<Man, Info>
const mans2: Mans2 = {
    allen: { name: 'allen', age: 2 },
    tim: { name: '', age: 2 }
}

// type T114 = string | number | symbol
type T114 = keyof any

/**
 * Pick
 */
interface T1115 {
    name: string,
    age: number,
    sex: string
}

type T116 = Pick<T1115, 'name' | 'age'>
const t116: T116 = { name: 'tim', age: 12 }

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type T117 = Pick<T1115, 'name' | 'age'>
const t117: T117 = { name: 'tim', age: 12 }

/**
 * Exclude
 */
interface T1118 {
    name: string,
    age: number,
    sex: string,
    top: number
}
// sex top
type T119 = Exclude<keyof T1118, 'name' | 'age'>
const t119: T119 = 'sex'
const t120: T119 = 'top'

type MyExclude<T, U> = T extends U ? never : T

type T121 = Exclude<keyof T1118, 'name' | 'age'>
const t121: T121 = 'sex'
const t122: T121 = 'top'

/**
 * ReturnType
 * ReturnType<T> 的作用是用于获取函数 T 的返回类型。
 */

// string
type T0 = ReturnType<() => string>;

type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any


/**
 * Required
 */
interface T122 {
    name?: string,
    age?: number
}

type T123 = Required<T122>
const t123: T123 = {
    name: 'allen',
    age: 23
}

type MyRequired<T> = {
    [P in keyof T]-?: T[P]
}

type T124 = Required<T122>
const t124: T124 = {
    name: 'allen',
    age: 23
}

/**
 * Readonly
 */
interface T125 {
    name?: string,
    age?: number
}

type T126 = Readonly<T125>
const t126: T126 = {
    name: 'allen'
}

// Cannot assign to 'name' because it is a read-only property.ts(2540)
// t126.name = 'tim'

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}

type T127 = MyReadonly<T125>
const t127: T127 = {
    name: 'a'
}

// Cannot assign to 'name' because it is a read-only property.ts(2540)
// t127.name = 'jack'

/**
 * Omit
 */
interface T128 {
    name: string,
    age: number,
    sex: string
}

type T129 = Omit<T128, 'name' | 'age'>
const t129: T129 = { sex: 'man' }

// type MyOmit<T, K extends keyof T> = {
//     [P in Exclude<keyof T, K>]: T[P]
// }

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type T130 = MyOmit<T128, 'name' | 'age'>
const t130: T130 = { sex: 'man' }


/**
 * Extract
 */

