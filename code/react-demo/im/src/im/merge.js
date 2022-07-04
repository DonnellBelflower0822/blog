import { Map, List, merge } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = Map({ a: 3, d: 4, e: 5 })
console.log(merge(map1, map2))  // {a:3,b:{c:2},d:4,e:5}

const list1 = new List(['a', 'b', 'c'])
const list2 = new List(['a', 'd', 'e'])
console.log(merge(list1, list2))  //  ["a", "b", "c", "a", "d", "e"]
