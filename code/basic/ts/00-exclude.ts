// 'a' | 'b'
type T0 = Exclude<'a' | 'b' | 'c', 'c' | 'd'>

type MyExclude<T, U> = T extends U ? never : T

type T1 = MyExclude<'a' | 'b' | 'c', 'c' | 'd'>
