import { Map, List, setIn, getIn } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = map1.set('a', '2')
const map3 = setIn(map2, ['b', 'c'], 3)
console.log(map1) // {a: 1, b: { c: 2 }}
console.log(map2) // {a:2, b:{c:2}}
console.log(map3) // {a:2, b:{c:3}}

console.log(getIn(map3, ['b', 'c']))  // 3

const list1 = new List(['a', 'b', 'c'])
const list2 = setIn(list1, [0], { name: 'allen' })
console.log(list1) // ['a', 'b', 'c']
console.log(list2) // [{name: "allen"}, 'b', 'c']

const list3 = setIn(list2, [0, 'name'], 'jack')
console.log(list3)  // [{name: "jack"}, 'b', 'c']

console.log(getIn(list3, [0, 'name']))  // jack