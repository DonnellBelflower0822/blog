var name = 'window'

var person1 = {
    name: 'person1',
    show1: function () {
        console.log(this.name)
    },
    show2: () => console.log(this.name),
    show3: function function3() {
        return function () {
            console.log(this.name)
        }
    },
    show4: function () {
        // 下面箭头函数的this执行这里的this
        return () => console.log(this.name)
    }
}
var person2 = { name: 'person2' }

person1.show1() // person1
person1.show1.call(person2) // person2

person1.show2() // window
person1.show2.call(person2) // window

// (person1.show3() -> function3)()
person1.show3()()  // window
person1.show3().call(person2)   // person2

person1.show3.call(person2)()   // window

person1.show4()()   // person1
person1.show4().call(person2)   // person1
person1.show4.call(person2)()   // person2
