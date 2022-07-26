console.log(Symbol.for('foo') === Symbol.for('foo'))    // true


const s1 = Symbol.for('bar')
console.log(Symbol.keyFor(s1))  // bar

const s2 = Symbol.for('bar')
console.log(Symbol.keyFor(s2))  // bar


