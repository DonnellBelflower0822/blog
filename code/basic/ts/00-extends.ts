
interface HasLength {
    length: number
}

function fn<T extends HasLength>(arg: T) {
    console.log(arg.length)
}
// Argument of type 'number' is not assignable to parameter of type 'HasLength'.ts(2345)
fn(1)
fn('1')
fn(['1'])
fn({ length: 1 })
