function Foo() { }

Foo.prototype.say = function () {
    console.log('say')
}

const foo = new Foo()

console.log(foo.__proto__ === Foo.prototype)    // true
console.log(Foo.prototype.constructor === Foo)  // true