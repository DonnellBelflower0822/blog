// 断言

/**
 * <>语法
 */
const an1: any = 'hello'
const num1: number = (<string>an1).length
console.log(num1)

/**
 * as语法
 */
const an2: any = 'hello'
const num2: number = (an1 as string).length
console.log(num2)

let an3: string | undefined | null
// 忽略  undefined 和 null
console.log(an3!.length)
// 报错  undefined 和 null没有length属性
// console.log(an3.length)
