/***
 * 相同
 */
// 声明对象或函数
interface Fn1 {
    (str: number): string
}
type Fn2 = (str: number) => string

interface Obj1 {
    age: number
}
type Obj2 = {
    age: number
}

// 扩展
type Extend1 = { name: string }
type Extend2 = Extend1 & { age: number }

interface Extend3 { name: string }
interface Extend4 extends Extend3 { age: number }

// type扩展interface
type Extend5 = Extend1 & Extend3
interface Extend6 extends Extend1 { }

/**
 * 不同
 */

// 基本类型, 联合类型, 元祖类型
type Base = number
type Union = number | string
type Tu = [number, string]

// 同名interface可合并, type不能存在同名
interface A { name: string }
interface A { age: number }
const a: A = { name: '', age: 1 }

