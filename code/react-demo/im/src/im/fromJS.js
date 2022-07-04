import { List, Map, getIn, fromJS } from 'immutable'

// Map 和 List 方法在创建数据时不支持深层嵌套，fromJS 方法支持深层嵌套。
const map1 = Map({ a: 1, b: { c: 2 } })
console.log(getIn(map1, ['b'])) // {c: 2}

const map2 = fromJS({ a: 1, b: { c: 2 }, d: [1, 2, 3] })
console.log(getIn(map2, ['b'])) // Map {c: 2}
console.log(getIn(map2, ['d'])) // List [1,2,3]

const list1 = List([1, { name: 'allen' }])
console.log(getIn(list1, [1]))  // {name:'allen'}

const list2 = fromJS([1, { name: 'allen' }])
console.log(getIn(list2, [1]))  // Map {name:'allen'}
