function Test() {
}
Test.prototype.then = function () {
  console.log('Test then')
}

Function.prototype.myThen = function () {
  console.log('mythen')
}

console.log(Test.__proto__ === Function.prototype)

Test.myThen()
// Test.then()
