function Person() {
  this.name = 'allen'
  // return 1   // 实例为Person {name: "allen"}
  // return 'string'  //实例为 Person {name: "allen"}
  // return null     // 实例为Person {name: "allen"}
  // return undefined  // //实例为 Person {name: "allen"}

  // return { name: 'tom' }  // 实例为{name: "tom"}
  // return []   // 实例为 []

  return function () {  // 实例为  ƒ () { console.log('1') }
    console.log('1')
  } 
}

const p = new Person()
console.log(p)