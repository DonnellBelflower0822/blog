type Person = {
    name: string;
    hobby: string;
    age: number
}

type PickPerson = Pick<Person, 'name' | 'age'>

type MyPick<T, U extends keyof T> = {
    [P in U]: T[P]
}
// type MyPickPerson = {
//     name: string;
//     age: number;
// }
type MyPickPerson = Pick<Person, 'name' | 'age'>
