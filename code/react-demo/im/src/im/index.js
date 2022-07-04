import { fromJS, is } from 'immutable'

const map1 = fromJS({ a: 1, b: { c: 2 }, d: [1, 2, 3] })
const map2 = fromJS({ a: 1, b: { c: 2 }, d: [1, 2, 3] })

console.log(is(map1, map2)) // true
