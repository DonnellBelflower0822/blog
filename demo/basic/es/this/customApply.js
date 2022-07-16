Function.prototype.customApply = function (context = window, args = []) {
    const _args = Array.isArray(args) ? args : []
    const name = Symbol()
    context[name] = this
    const result = context[name](..._args)
    delete context[name]
    return result
}

function say(...args) {
    console.log(this, args)
    return this.hello
}

console.log(
    say.customApply({ hello: 'call' }, [1, 2, 3])
)