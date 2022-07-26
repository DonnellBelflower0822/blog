Function.prototype.customCall = function (context = window, ...args) {
    const name = Symbol()
    context[name] = this
    const result = context[name](...args)
    delete context[name]
    return result
}

function say(...args) {
    console.log(this, args)
    return this.hello
}

// { hello: 'call', [Symbol()]: [Function: say] } [ 1, 2, 3 ]
// call
console.log(
    say.customCall({ hello: 'call' }, 1, 2, 3)
)