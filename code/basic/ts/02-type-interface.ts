// 声明对象
type Obj1 = {
    name: string
    age: number
}

interface Obj2 {
    name: string
    age: number
}

// 声明函数
type Fn1 = (name: string) => void

interface Fn2 {
    (name: string): void
}

const fn2: Fn2 = (n) => {
    console.log(n.startsWith('http'))
}

// 声明简单类型或联合类型
// interface不行

type S = string
type USN = string | number

// 继承
interface Animal1 {
    type: string
}

interface Bear1 extends Animal1 {
    honey: boolean
}

type Animal2 = {
    type: string
}

type Bear2 = Animal2 & { honey: boolean }

// 重复定义同名
interface Win {
    title: string
}
interface Win {
    size: number
}

// 重复定义同名的type会报错
// type Win1 = {
//     title: string
// }
// type Win1 = {
//     size: number
// }