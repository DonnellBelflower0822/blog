const _ = require('lodash')
const toUpper = s => s.toUpperCase()
const reverse = arr => arr.reverse()
const first = arr => arr[0]
const f = _.flowRight(toUpper, first, reverse)
console.log(f(['one', 'two', 'three'])) // "THREE"