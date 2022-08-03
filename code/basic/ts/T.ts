interface Person {
    name: string
    age: number
    hobby: string[]
}
const p1: Person = {
    name: 'allen',
    age: 27,
    hobby: ['lol']
}

// Partial

// type PartialPerson = {
//     name?: string | undefined;
//     age?: number | undefined;
//     hobby?: string[] | undefined;
// }
type PartialPerson = Partial<Person>

type MyPartial<T> = {
    [K in keyof T]?: T[K]
}

type PartialPerson1 = Partial<Person>

// Record
// type RecordPerson = {
//     allen: Person;
//     tim: Person;
// }
type RecordPerson = Record<'tim' | 'allen', Person>

type MyRecord<K extends keyof any, T> = {
    [P in K]: T
}

// type RecordPerson1 = {
//     allen: Person;
//     tim: Person;
// }
type RecordPerson1 = Record<'tim' | 'allen', Person>

// Pick
// type PickPerson = {
//     name: string;
//     age: number;
// }
type PickPerson = Pick<Person, 'name' | 'age'>

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type PickPerson1 = MyPick<Person, 'name' | 'age'>

// Extract
interface ManPerson {
    name: string
    age: number
    hobby: string[],
    a: number
}

// ManPerson
type A = Extract<ManPerson, PartialPerson>
type B = Extract<PartialPerson, ManPerson>

type MyExtract<T, U> = T extends U ? T : never

type C = Extract<ManPerson, PartialPerson>
type D = Extract<PartialPerson, ManPerson>

// Exclude

// type ExcludeData = "age" | "hobby"
type ExcludeData = Exclude<keyof Person, 'name'>

type MyExclude<U, K> = U extends K ? never : U
type ExcludeData1 = MyExclude<keyof Person, 'name'>

// ReturnType

// Required
type MyRequired<T> = {
    [K in keyof T]-?: T[K]
}

// Readonly
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
}

// Omit

type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P]
}

