// 都可以定义对象或函数
interface O1 { name: string }
type O2 = { age: string }

interface F1 { (a: string): string }
type F2 = (a: string) => string

// 都可以继承
interface O3 extends O1 {
    age: number
}
interface O4 extends O2 {
    name: string
}
type O5 = O2 & { name: string }
type O6 = O1 & { age: number }

// type可以, interface不行
type Basic = string
type UnionType = string | number
type Arr = string[]
type Tuple = [string, number]

// interface行, type不行
interface A {
    name: string
}
interface A {
    age: number
}
