const str: string = 'hello ts'
const num: number = 10
const bool: boolean = true

const arr: number[] = [1, 2]
const arr1: Array<number> = [2, 3]

// 声明为any, 则放弃类型检查
const a: any = { name: 'allen' }
a.say()

// 联合类型
let unitionType: string | number = 'str'
unitionType = 20

