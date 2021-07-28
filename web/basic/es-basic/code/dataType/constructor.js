console.log(
  (2).constructor === Number, // true
  ('string').constructor === String, // true
  (true).constructor === Boolean, // true
  (Symbol()).constructor === Symbol,  //true

  // 报错
  // (undefined).constructor,
  // (null).constructor,

  [].constructor === Array, // true
  [].constructor === Object,  // false
  
  {}.constructor === Object,  // true

  (console.log).constructor === Function, // true
  (console.log).constructor === Object, // false
)

// 可以任意修改
function Person() { }
Person.prototype.constructor = Array

const p = new Person()
console.log(p.constructor === Person) // false
console.log(p.constructor === Array)  // true

