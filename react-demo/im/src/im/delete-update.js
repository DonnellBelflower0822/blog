import { Map, List, removeIn, updateIn } from 'immutable'

const map1 = Map({ a: 1, b: { c: 2 } })
const map2 = removeIn(map1, ['b'])
console.log(map2) // {a:1}

// 第三个参数为更新函数
const map3 = updateIn(map1, ['b', 'c'], target => `hello-${target}`)
console.log(map3) // {a:1,b:{c:'hello-2'}}

const list1 = new List(['a', 'b', 'c'])
const list2 = removeIn(list1, [0])
console.log(list2)  //  [undefined "b", "c"]

const list3 = updateIn(list1, [0], target => target + 'jack')
console.log(list3)  // ["ajack", "b", "c"]
