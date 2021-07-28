// 原型链继承
function Animal() {
  this.base = 'animal'
  this.color = ['red', 'yellow']
}

Animal.prototype.say = function () {
  console.log(this.type)
}

function Dog() {
  this.type = 'dog'
}

// 在原型对象上去继承Animal
Dog.prototype = new Animal()

const dog1 = new Dog()
const dog2 = new Dog()

dog1.color.push('black')
// [ 'red', 'yellow', 'black' ]
console.log(dog2.color)