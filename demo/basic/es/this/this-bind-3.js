function foo(b, c) {
    console.log(this.a, b, c)
}

var obj = {
    a: 'object'
}

foo.call(obj, 1, 2) // object 1 2
foo.apply(obj, [3, 4])  // object 3 4

const bindFunction = foo.bind(obj)
bindFunction(5, 6)  // object 5 6
bindFunction.apply({ a: 'new object' }, [7, 8]) // object 7 8
