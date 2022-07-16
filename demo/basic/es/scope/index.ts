var scope = "global scope";
function checkscope(name) {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f();
}
checkscope('tom');

type ExectionContext = any[]

// 创建全局执行上下文
interface GlobalExectionContext {
    VO: Window & {
        scope: string | undefined
        checkscope: {
            (name): void,
            // 函数定义时就决定了其作用域
            '[[Scopes]]': [GlobalExectionContext['VO']]
        }
    }
}

// 当前执行上下文
// ExectionContext = [GlobalExectionContext]

// 执行checkscope('tom')

// 创建checkscope执行上文
interface CheckscopeExectionContext {
    AO: {
        name: 'tom',
        scope: string | undefined
        f: {
            (): void,
            '[[Scopes]]': [
                GlobalExectionContext['VO'],
                CheckscopeExectionContext['AO']
            ]
        }
    },
    '[[Scopes]]': [
        // ...GlobalExectionContext['VO']['checkscope']['[[Scopes]]']
        GlobalExectionContext['VO']
    ]
}

// 当前执行上下文
// ExectionContext = [GlobalExectionContext, CheckscopeExectionContext]

// 执行f()
interface FExectionContext {
    AO: {
    },
    '[[Scopes]]': [
        // ...CheckscopeExectionContext['AO']['f']['[[Scopes]]']
        GlobalExectionContext['VO'],
        CheckscopeExectionContext['AO']
    ]
}

// 当前执行上下文
// ExectionContext = [GlobalExectionContext, CheckscopeExectionContext, FExectionContext]

// f函数里面的scope就会从 当前变量对象(AO) 和 [[Scopes]] 里面去一层层找scope变量的值