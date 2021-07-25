var value = 1

function foo() {
  // js采用静态作用域，函数定义时就决定了作用域
  console.log(value)
}

function bar() {
  var value = 2
  foo()
}

// 1
bar()