type Person = {
    name: string;
    hobby: string;
    age: number
}

type OmitPerson = Omit<Person, 'name' | 'age'>

type MyOmit<T, U extends keyof T> = {
    [P in Exclude<keyof T, U>]: T[P]
}

// type MyOmitPerson = {
//     hobby: string;
// }
type MyOmitPerson = MyOmit<Person, 'name' | 'age'>
