interface Man {
    name: string,
    age: number
}
// type Name = string
type Name = Man['name']

