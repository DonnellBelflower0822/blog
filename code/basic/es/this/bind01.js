Function.prototype.customBind = function (context = window, ...args) {
    const fn = this

    return function Fn(...restArgs) {
        if (this instanceof Fn) {
            return new fn(...args, ...restArgs)
        }
        return fn.call(context, ...args, ...restArgs)
    }
}

function func(...args) {
    console.log(args)
    this.name = 'allen'
}
func.prototype.say = function () {
    console.log('hello', this.name)
}

const fn = func.customBind({ hello: 'call' }, 1, 2, 3)
// fn(12)

const f = new fn(22)
f.say()

// true
console.log(f instanceof func)


function func1() {
    console.log(this.a)
}

const f1 = func1
    .bind({ a: 1 })
    .bind({ a: 2 })
    .bind({ a: 3 })
// 1
f1()
