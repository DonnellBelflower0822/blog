// 1. 有一方是Number
// 2. Number(null) + 1 => 0+1 => 1
console.log(null + 1)

// String([]) + String([])
// '' + '' => ''
console.log([] + [])

// String({}) + String([])
// '[object Object]' + '' => '[object Object]'
console.log({} + [])

// String([]) + String({})
// '' + '[object Object]' => '[object Object]'
console.log([] + {})