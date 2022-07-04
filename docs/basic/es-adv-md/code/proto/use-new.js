function Person() {
  this.name = 'allen'
}

const p = new Person()
console.log(p)  // Person { name: 'allen' }

const p1 = Person()
console.log(p1)  // undefined
console.log(global.name)  // allen