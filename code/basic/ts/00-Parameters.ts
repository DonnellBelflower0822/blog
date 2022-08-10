// type P = [a: string, b: number]
type P = Parameters<(a: string, b: number) => void>

type MyParamters<T extends (...args: any) => any> = (
    T extends (...args: infer P) => any ? P : never
)
// type P1 = [a: string, b: number]
type P1 = MyParamters<(a: string, b: number) => void>
