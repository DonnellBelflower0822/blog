const arr = [1, 2, 3, 4, 5]

// slice是纯函数,相同输入得到相同输出
arr.slice(1, 3)
arr.slice(1, 3)

// splice不是纯函数,相同输入得不到相同输出
arr.splice(1, 2)
arr.splice(1, 2)
console.log(arr)

// 相同输入得到相同结果
function sum(a, b) {
  return a + b
}
// 下面就不是纯函数
function sum(a, b) {
  return a + b + Math.random()
}

