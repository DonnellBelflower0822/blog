
type MyReturnType<T> = T extends (...args: any) => infer R ? R : any

// string
type Re = MyReturnType<() => string>
