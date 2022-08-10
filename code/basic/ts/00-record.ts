// type Person1 = {
//     name: string;
//     hobby: string;
// }
type Person1 = Record<'name' | 'hobby', string>

// type KeyofAny = string | number | symbol
type KeyofAny = keyof any
type MyRecord<K extends keyof any, T> = {
    [P in K]: T
}
// type Person2 = {
//     name: string;
//     hobby: string;
// }
type Person2 = Record<'name' | 'hobby', string>
