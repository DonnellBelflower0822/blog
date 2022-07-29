/**
 * any
 * 任何类型都可以被归为 any 类型
 * TypeScript 允许我们对 any 类型的值执行任何操作，
 * 而无需事先执行任何形式的检查
 */
const str: any = 'hello any'

str.say()

const str1: string = str

/**
 * unknown
 * 所有类型也都可以赋值给 unknown
 * unknown 类型只能被赋值给 any 类型和 unknown 类型本身
 * 
 */

const un1: unknown = 'heloo'

// error Object is of type 'unknown'.ts(2571)
// un1.say()

// error  Type 'unknown' is not assignable to type 'string'.ts(2322)
// const un2: string = un1

const un3: any = un1
const un4: unknown = un1


/**
 * Void
 * 表示没有任何类型
 */

function fn1(): void {
    console.log('hello void')
}

/**
 * never
 * 那些永不存在的值的类型
 * 例子
 *      总是会抛出异常
 *      根本就不会有返回值的函数表达式
 *      箭头函数表达式的返回值类型
 */

function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) { }
}