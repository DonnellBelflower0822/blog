
// type NonNullableData = "name" | "age"
type NonNullableData = NonNullable<'name' | 'age' | undefined | null>

type MyNonNullable<T> = T extends null | undefined ? never : T
// type MyNonNullableData = "name" | "age"
type MyNonNullableData = MyNonNullable<'name' | 'age' | undefined | null>
