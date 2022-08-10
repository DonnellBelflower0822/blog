type PersonKeys = "number" | "name"

// type Obj = {
//     number: string;
//     name: string;
// }
type Obj = {
    [key in PersonKeys]: string
}