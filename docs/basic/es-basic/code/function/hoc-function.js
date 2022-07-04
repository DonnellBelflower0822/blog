// 函数作为参数
const arr = [1, 2, 3, 4]
arr.forEach((item, index) => {
  console.log(item, index)
})

// 将函数作为返回值
function pay() {
  let isPay = false
  return () => {
    if (isPay) {
      return
    }
    console.log('paying')
    isPay = true
  }
}
const payFn = pay()
payFn()
payFn()