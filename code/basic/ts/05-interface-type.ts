/**
 * 同名属性重复声明
 * interface会合并
 * type会报错
 */
interface In1 {
    name: string,
}

interface In1 {
    age: number,
}

const in1: In1 = {
    name: 'allen',
    age: 2
}

type In2 = { name: string }
// 报错, Duplicate identifier 'In2'
// type声明类型不能重名
// type In2 = { age: number }

/**
 * 声明函数
 */
type Fn1 = (str: string) => void
interface Fn2 {
    (str: string): void
}

/**
 * 只有type能声明
 * 1. 简单类型
 * 2. 联合类型
 * 3. tuple
 */
type In3 = string
type In4 = string | number
type In5 = [string, number]

/**
 * 扩展
 */
interface In6 { x: number }
interface In7 extends In6 {
    y: number
}

type In8 = { x: number }
type In9 = In8 & { y: number }

interface In10 extends In8 {
    y: number
}
const in10: In10 = {
    x: 1,
    y: 1
}

type In11 = In6 & {
    y: number
}

const in11: In11 = {
    x: 1,
    y: 2
}

/**
 * 实现
 */
interface In12 { x: number, y: number }
class In13 implements In12 {
    x = 1
    y = 2
}

type In14 = { x: number, y: number }
class In15 implements In14 {
    x = 3
    y = 4
}