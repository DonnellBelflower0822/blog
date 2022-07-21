const sex = Symbol('sex')
const age = Symbol('age')
const marry = Symbol('marry')

const person = {
    name: 'allen',
    [sex]: '男',
    // 模拟原型链
    __proto__: {
        from: '广东',
        [age]: 27,
        __proto__: {
            job: 'web',
            [marry]: false
        }
    }
}

// 设置hobby不能被枚举
Object.defineProperty(person, 'hobby', {
    enumerable: false,
    value: ['nba', 'lol']
})

// ['name']
console.log(Object.keys(person))