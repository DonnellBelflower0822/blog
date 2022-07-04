function fun3() {
  console.log('fun3')
}

function fun2() {
  fun3();
}

function fun1() {
  fun2();
}

fun1()

ECStack = []

// 全局代码
ECStack.push(globalContext)