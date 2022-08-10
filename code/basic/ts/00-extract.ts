// 'c'
type T00 = Extract<'a' | 'b' | 'c', 'c' | 'd'>

type CustomExtract<T, U> = T extends U ? T : never

// type T01 = "c"
type T01 = CustomExtract<'a' | 'b' | 'c', 'c' | 'd'>
