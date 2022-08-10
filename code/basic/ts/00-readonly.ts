interface Pers1 {
    name: string
    age: number
}
// type Pers2 = {
//     readonly name: string;
//     readonly age: number;
// }
type Pers2 = Readonly<Pers1>

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}
// type Pers3 = {
//     readonly name: string;
//     readonly age: number;
// }
type Pers3 = Readonly<Pers1>
