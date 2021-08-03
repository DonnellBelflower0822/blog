function Person() {
  this.name = 'allen'
  this.arr = [1, 2]
}
Person.prototype.say = function () { }

function Man() { }
Man.prototype = new Person()

const man1 = new Man()
man1.name = 'man1'
man1.arr.push(3)

/**
 man1 = {
   name: "man1",
   [[Prototype]]: {
     arr: (3) [1, 2, 3]
     name: "allen"
   }
 }
 */

const man2 = new Man()
console.log(man2.name)
/**
 {
   [[Prototype]]: {
    arr: (3) [1, 2, 3]
    name: "allen"
   }
 }
 */

// 构造函数内去继承, 会丢失父类的prototype
function Man1() {
  Person.call(this)
}
const man_1 = new Man1()


// 组合继承, 增强构造函数+原型对象继承
// 会存在两份父类的实例属性
function Man2() {
  Person.call(this)
}
Man2.prototype = new Person()

const man_2 = new Man2()

/**
{
  arr: (2) [1, 2]
  name: "allen"
  [[Prototype]]: {
    arr: (2) [1, 2],
    name: "allen"
  }
}
 */

function Man3() {
  Person.call(this)
}
const man3Prototype = Object.create(Person.prototype)
man3Prototype.constructor = Man3
Man3.prototype = man3Prototype


