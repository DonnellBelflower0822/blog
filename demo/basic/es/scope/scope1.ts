var data: Array<() => void> = []
for (var i = 0; i < 3; i += 1) {
    data[i] = function () {
        console.log(i)
    }
}

data[0]()
data[1]()
data[2]()

// 创建全局执行上下文阶段
interface GlobalContext {
    VO: {
        data: undefined | Array<() => void>
        i: undefined | number
    }
}

// before 函数执行前
const globalContext: GlobalContext = {
    VO: {
        data: [
            // Scopes [GlobalContext.VO]
            () => { },
            // Scopes [GlobalContext.VO]
            () => { },
            // Scopes [GlobalContext.VO]
            () => { },
        ],
        i: 3
    }
}

// 创建 data[0]() 执行上下文
interface Fn0Context {
    VO: {
    },
    Scopes: [GlobalContext['VO']]
}

// 创建 data[1]() 执行上下文
interface Fn1Context {
    VO: {
    },
    Scopes: [GlobalContext['VO']]
}



