type CustomPartial<T> = {
    [P in keyof T]?: T[P]
}

interface Pers {
    name: string
    age: number
}

// type PartialPer = {
//     name?: string | undefined;
//     age?: number | undefined;
// }
type PartialPer = CustomPartial<Per>

