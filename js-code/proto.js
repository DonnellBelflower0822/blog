function F() { }

Function.prototype.a = () => {
  console.log('a')
}

Object.prototype.b = () => {
  console.log('a')
}

F.a()
F.b()

const f = new F()
f.a()
f.b()

function Fn() { }
console.log(Fn.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)

const fn = new Fn()
console.log(fn.__proto__ === Fn.prototype)
console.log(Fn.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)


console.log((2.556 - 2.391) * 1500)