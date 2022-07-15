enum EnvironmentRecordType {
    '全局环境' = 'Object',
    '函数环境' = 'EnvironmentRecord'
}

type ParentFunctionEnvironmentReference = Record<string, unknown>

// 词法环境(LexicalEnvironment)和变量环境(VariableEnvironment)的区别
// 词法环境(LexicalEnvironment)存储 函数声明, let/const声明
// 变量环境(VariableEnvironment)存储 var声明

// 全局执行上下文: 只有一个
interface GlobalExectionContext {
    // 确定this
    ThisBinding: Window
    // 词法环境: 存储变量和函数声明的实际位置
    LexicalEnvironment: {
        // 环境记录
        EnvironmentRecord: Window & {
            // 环境记录标识: 全局环境和函数环境
            type: EnvironmentRecordType.全局环境,
            // 在es6储存函数声明和let,const声明的变量
            funcName: () => void
            letName: unknown
            constName: unknown,
        } & {
            // 自定义全局变量
            customName: unknown
        }
        // 对外部环境的引用: 以访问其外部词法环境
        // 全局环境 -> null
        outer: null
    }
    // 变量环境
    VariableEnvironment: {
        // 环境记录
        EnvironmentRecord: Window & {
            // 环境记录标识: 全局环境和函数环境
            type: EnvironmentRecordType.全局环境,
            // 在es6储存var声明的变量
            varName: unknown
        } & {
            // 自定义全局变量
            customName: unknown
        }
        // 对外部环境的引用
        // 全局环境 -> null
        outer: null
    },
}

// 函数执行上下文: 可以存在多个
interface FunctionExectionContext {
    // 确定this: 取决于函数的调用方式
    ThisBinding: any
    // 词法环境: 存储变量和函数声明的实际位置
    LexicalEnvironment: {
        // 环境记录
        EnvironmentRecord: {
            // 环境记录标识: 全局环境和函数环境
            type: EnvironmentRecordType.函数环境
            // 函数参数
            Arguments: ArrayLike<unknown>,
            // 在es6储存函数声明和let,const声明的变量
            funcName: () => void
            letName: unknown
            constName: unknown
        }
        // 对外部环境的引用: 以访问其外部词法环境
        // 函数环境 -> 全局/父级环境
        outer: Window | ParentFunctionEnvironmentReference
    }
    // 变量环境
    VariableEnvironment: {
        // 环境记录
        EnvironmentRecord: {
            // 环境记录标识: 函数环境
            type: EnvironmentRecordType.函数环境
            // 函数参数
            Arguments: ArrayLike<unknown>,
            // 函数内用var声明的变量
            varName: unknown
        }
        // 对外部环境的引用
        // 函数环境 -> 全局/父级环境
        outer: Window | ParentFunctionEnvironmentReference
    },
}

// 执行上下文
type ExectionContext = GlobalExectionContext | FunctionExectionContext

class ECStack {
    // 执行上下文栈: 先进后出的数据结构
    exectionContextStack: ExectionContext[] = []
    // 先进后出的数据结构
    push(exectionContext: ExectionContext) {
        this.exectionContextStack.push(exectionContext)
    }
    pop() {
        this.exectionContextStack.pop()
    }
}

// 执行栈
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f();
}
checkscope();

const ecStack = new ECStack()
ecStack.push(globalContext)
ecStack.push(checkscope <functionContext>)
ecStack.push(f <functionContext>)
ecStack.pop()
ecStack.pop()


var scope1 = "global scope";
function checkscope1(){
    var scope1 = "local scope";
    function f(){
        return scope1;
    }
    return f;
}
checkscope1()();

const ecStack1 = new ECStack()
ecStack1.push(checkscope1 <functionContext>)
ecStack1.pop()
ecStack1.push(f <functionContext>)
ecStack1.pop()


