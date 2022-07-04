import { Map } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = map1.set('a', '2')
console.log(map1 === map2)  // false
console.log(map1.get('b') === map2.get('b'))  // true