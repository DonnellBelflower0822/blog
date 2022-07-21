console.log(b)  // VM75:1 Uncaught ReferenceError: b is not defined

let b = 2       // 在代码块内，使用let命令声明变量之前，该变量都是不可用的(暂时性死区)

