type CustomRequired<T> = {
    [P in keyof T]-?: T[P]
}

interface Per {
    name?: string
    age?: number
}

// type ReqPer = {
//     name: string;
//     age: number;
// }
type ReqPer = CustomRequired<Per>

