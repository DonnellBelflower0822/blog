Function.prototype.customBind = function (context = window, ...args) {
    const fn = this

    return function (...restArgs) {
        debugger
        console.log(this)
        return fn.call(context, ...args, ...restArgs)
    }
}

function say(...args) {
    console.log(this, args)
    this.name = 'allen'
}

const fn = say.customBind({ hello: 'call' }, 1, 2, 3)
fn(12)

new fn(22)