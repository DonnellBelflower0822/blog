type Fn = () => string
// string
type Return = ReturnType<Fn>

type MyReturnType<T extends (...args: any) => any> = (
    T extends (...args: any) => infer R ? R : never
)

// type MyReturn = string
type MyReturn = MyReturnType<Fn>
